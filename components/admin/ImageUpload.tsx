'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from './AdminContext';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  name?: string;
}

export default function ImageUpload({ value, onChange, name = 'image' }: ImageUploadProps) {
  const { token } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    if (!token) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || 'Upload failed');
        return;
      }

      const data = await res.json();
      onChange(data.url);
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  if (value) {
    return (
      <div className="relative group">
        <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-200" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
        <input
          type="text"
          value={value}
          readOnly
          className="mt-2 w-full text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 truncate"
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        dragOver ? 'border-cethos-teal bg-cethos-teal/5' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      {uploading ? (
        <div className="w-6 h-6 border-2 border-cethos-teal border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            {dragOver ? <Upload className="w-5 h-5 text-cethos-teal" /> : <ImageIcon className="w-5 h-5 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-500">Drop image or click to upload</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP, GIF. Max 5MB</p>
        </>
      )}
    </div>
  );
}
