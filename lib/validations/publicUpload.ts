import { z } from 'zod'

// Schema for /secure-upload form. Validated server-side in app/api/public-upload.
// Files are validated separately (FormData) — zod doesn't natively handle Files.

export const publicUploadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(200, 'Name is too long'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(320, 'Email is too long'),
  phone: z
    .string()
    .trim()
    .min(5, 'Phone number is required')
    .max(40, 'Phone number is too long'),
  orderOrQuoteId: z
    .string()
    .trim()
    .max(100, 'Order/quote ID is too long')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .max(5000, 'Message is too long')
    .optional()
    .or(z.literal('')),
  // Honeypot — real users leave this empty. If filled, we silently accept and do nothing.
  companyWebsite: z
    .string()
    .max(500)
    .optional()
    .or(z.literal('')),
})

export type PublicUploadPayload = z.infer<typeof publicUploadSchema>

// File validation constants (applied in the API route)
export const MAX_FILES = 25
export const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100 MB
export const ACCEPTED_MIME_TYPES: ReadonlySet<string> = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
])

// Magic-byte signatures for defense-in-depth (extension can lie). We check
// the first N bytes of each file against known signatures. Anything not
// matching is rejected even if the Content-Type header says otherwise.
export type MagicSignature = { bytes: number[]; offset?: number }

export const MAGIC_SIGNATURES: Record<string, MagicSignature[]> = {
  'application/pdf': [{ bytes: [0x25, 0x50, 0x44, 0x46] }], // %PDF
  'image/jpeg': [{ bytes: [0xff, 0xd8, 0xff] }],
  'image/png': [{ bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  'image/webp': [{ bytes: [0x52, 0x49, 0x46, 0x46] }], // RIFF (followed later by WEBP)
  'image/tiff': [
    { bytes: [0x49, 0x49, 0x2a, 0x00] }, // little-endian
    { bytes: [0x4d, 0x4d, 0x00, 0x2a] }, // big-endian
  ],
  'image/heic': [{ bytes: [0x66, 0x74, 0x79, 0x70], offset: 4 }], // ftyp at offset 4
  'image/heif': [{ bytes: [0x66, 0x74, 0x79, 0x70], offset: 4 }],
  // DOCX/DOC both open as ZIP (PK\x03\x04) or OLE Compound (D0CF11E0A1B11AE1).
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    { bytes: [0x50, 0x4b, 0x03, 0x04] },
  ],
  'application/msword': [
    { bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] },
  ],
}

export function matchesMagicBytes(buffer: Uint8Array, mimeType: string): boolean {
  const sigs = MAGIC_SIGNATURES[mimeType]
  if (!sigs) return false
  return sigs.some((sig) => {
    const offset = sig.offset ?? 0
    if (buffer.byteLength < offset + sig.bytes.length) return false
    for (let i = 0; i < sig.bytes.length; i++) {
      if (buffer[offset + i] !== sig.bytes[i]) return false
    }
    return true
  })
}

export function sanitizeFilename(name: string): string {
  // Strip path separators, collapse weird chars, keep extension
  const stripped = name.replace(/[/\\]/g, '_')
  return stripped
    .replace(/[()[\]]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 200)
    .toLowerCase()
}
