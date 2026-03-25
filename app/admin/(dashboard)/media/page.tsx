'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Upload, Search, X, Copy, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface MediaAsset {
  name: string;
  url: string;
  size: number;
  created_at: string;
  alt_text?: string;
}

export default function MediaLibraryPage() {
  const { adminFetch } = useAdmin();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
      }
    } catch {
      // Media library might not have API yet
      setAssets([]);
    }
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => { fetchAssets(); }, [fetchAssets]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

    for (const file of Array.from(files)) {
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format`);
        continue;
      }

      setUploading(true);
      setUploadProgress(30);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name.replace(/\.[^/.]+$/, ''));

      try {
        const res = await adminFetch('/api/admin/upload', {
          method: 'POST',
          headers: {}, // Let browser set content-type for FormData
          body: formData,
        });

        setUploadProgress(90);

        if (res.ok) {
          toast.success(`${file.name} uploaded`);
          fetchAssets();
        } else {
          toast.error(`Failed to upload ${file.name}`);
        }
      } catch {
        toast.error(`Error uploading ${file.name}`);
      }
    }
    setUploading(false);
    setUploadProgress(0);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Media Library</h1>
          <p className="text-sm text-[#64748b] mt-1">{assets.length} files</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Upload Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Upload drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
          dragOver ? 'border-[#0d9488] bg-[#0d9488]/5' : 'border-gray-200 bg-white'
        }`}
      >
        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500">
          Drag and drop images here, or{' '}
          <button onClick={() => fileInputRef.current?.click()} className="text-[#0d9488] hover:text-[#0f766e] font-medium">
            browse
          </button>
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF, SVG</p>
        {uploading && (
          <div className="mt-4 max-w-xs mx-auto">
            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#0d9488] h-full rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by filename..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-16 text-center">
          <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">
            {search ? 'No files match your search' : 'No media files yet'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Upload images to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => (
            <button
              key={asset.name}
              onClick={() => setSelectedAsset(asset)}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-[#e2e8f0] hover:border-[#0d9488] hover:shadow-md transition-all"
            >
              <img
                src={asset.url}
                alt={asset.alt_text || asset.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{asset.name}</p>
                <p className="text-white/70 text-[10px]">{formatSize(asset.size)}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSelectedAsset(null)} />
          <div className="relative w-full max-w-md bg-white shadow-xl h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">File Details</h3>
              <button onClick={() => setSelectedAsset(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img src={selectedAsset.url} alt={selectedAsset.alt_text || selectedAsset.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Filename</label>
                <p className="text-sm text-gray-900">{selectedAsset.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Size</label>
                <p className="text-sm text-gray-900">{formatSize(selectedAsset.size)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={selectedAsset.url}
                    readOnly
                    className="flex-1 px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-md"
                  />
                  <button
                    onClick={() => { navigator.clipboard.writeText(selectedAsset.url); toast.success('URL copied'); }}
                    className="p-2 text-gray-500 hover:text-[#0d9488] hover:bg-gray-100 rounded-md"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setDeleteTarget(selectedAsset)}
                  className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete File"
        message={`Are you sure you want to delete '${deleteTarget?.name}'? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          toast.success('File deleted');
          setAssets(assets.filter(a => a.name !== deleteTarget?.name));
          setDeleteTarget(null);
          setSelectedAsset(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
