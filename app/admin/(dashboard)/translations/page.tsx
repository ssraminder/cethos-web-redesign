'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import Badge from '@/components/admin/Badge';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Globe, Layers, FileText, CheckCircle2, Loader2, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { hasPermission } from '@/lib/admin/permissions';

const ALL_LOCALES = ['fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru'];

interface Namespace {
  id: string;
  name: string;
  description: string | null;
  page_path: string | null;
}

interface Translation {
  id: string;
  namespace_id: string;
  key: string;
  segment_index: number;
  locale: string;
  value: string;
  status: string;
}

interface NamespaceStats {
  namespace: Namespace;
  englishCount: number;
  translatedCount: number;
  publishedCount: number;
  percentage: number;
  status: 'complete' | 'in-progress' | 'not-started';
}

function groupPrefix(name: string): string {
  const dot = name.indexOf('.');
  if (dot === -1) return 'other';
  return name.substring(0, dot);
}

const GROUP_LABELS: Record<string, string> = {
  homepage: 'Homepage',
  service: 'Services',
  industry: 'Industries',
  certified: 'Certified Translations',
  lifesciences: 'Life Sciences',
  location: 'Locations',
  common: 'Common / Shared',
  nav: 'Navigation',
  header: 'Header',
  footer: 'Footer',
  about: 'About',
  contact: 'Contact',
  quote: 'Quote Forms',
  blog: 'Blog',
  careers: 'Careers',
  legal: 'Legal Pages',
  other: 'Other',
};

export default function TranslationsPage() {
  const { adminUser, token } = useAdmin();
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocale, setSelectedLocale] = useState('fr');
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter locales based on user's assigned_locales
  const availableLocales = adminUser?.assigned_locales
    ? ALL_LOCALES.filter((l) => adminUser.assigned_locales!.includes(l))
    : ALL_LOCALES;

  useEffect(() => {
    async function fetchAll(
      supabase: ReturnType<typeof createBrowserSupabaseClient>,
      table: string,
      select: string,
      filter: Record<string, string>,
    ) {
      const allRows: Translation[] = [];
      const pageSize = 1000;
      let offset = 0;
      while (true) {
        let query = supabase!.from(table).select(select);
        for (const [k, v] of Object.entries(filter)) {
          query = query.eq(k, v);
        }
        const { data } = await query.range(offset, offset + pageSize - 1);
        if (!data || data.length === 0) break;
        allRows.push(...(data as Translation[]));
        if (data.length < pageSize) break;
        offset += pageSize;
      }
      return allRows;
    }

    async function fetchData() {
      setLoading(true);
      const supabase = createBrowserSupabaseClient()!;

      const [nsRes, enRows, localeRows] = await Promise.all([
        supabase.from('cethosweb_i18n_namespaces').select('*').order('name'),
        fetchAll(supabase, 'cethosweb_i18n_translations', 'id, namespace_id, key, segment_index, locale, value, status', { locale: 'en' }),
        fetchAll(supabase, 'cethosweb_i18n_translations', 'id, namespace_id, key, segment_index, locale, value, status', { locale: selectedLocale }),
      ]);

      if (nsRes.data) setNamespaces(nsRes.data);
      setTranslations([...enRows, ...localeRows]);
      setLoading(false);
    }
    fetchData();
  }, [selectedLocale]);

  const stats = useMemo(() => {
    const enByNs = new Map<string, number>();
    const translatedByNs = new Map<string, number>();
    const publishedByNs = new Map<string, number>();

    for (const t of translations) {
      if (t.locale === 'en') {
        enByNs.set(t.namespace_id, (enByNs.get(t.namespace_id) || 0) + 1);
      } else {
        if (t.value && t.value.trim() !== '') {
          translatedByNs.set(t.namespace_id, (translatedByNs.get(t.namespace_id) || 0) + 1);
        }
        if (t.status === 'published') {
          publishedByNs.set(t.namespace_id, (publishedByNs.get(t.namespace_id) || 0) + 1);
        }
      }
    }

    const nsStats: NamespaceStats[] = namespaces.map((ns) => {
      const en = enByNs.get(ns.id) || 0;
      const tr = translatedByNs.get(ns.id) || 0;
      const pub = publishedByNs.get(ns.id) || 0;
      const pct = en > 0 ? Math.round((tr / en) * 100) : 0;
      let status: 'complete' | 'in-progress' | 'not-started' = 'not-started';
      if (pct === 100) status = 'complete';
      else if (pct > 0) status = 'in-progress';
      return { namespace: ns, englishCount: en, translatedCount: tr, publishedCount: pub, percentage: pct, status };
    });

    return nsStats;
  }, [namespaces, translations]);

  const totalEnglish = stats.reduce((a, s) => a + s.englishCount, 0);
  const totalTranslated = stats.reduce((a, s) => a + s.translatedCount, 0);
  const totalPublished = stats.reduce((a, s) => a + s.publishedCount, 0);

  const grouped = useMemo(() => {
    const groups = new Map<string, NamespaceStats[]>();
    for (const s of stats) {
      const prefix = groupPrefix(s.namespace.name);
      if (!groups.has(prefix)) groups.set(prefix, []);
      groups.get(prefix)!.push(s);
    }
    // Sort groups by label
    const sorted = Array.from(groups.entries()).sort(([a], [b]) => {
      const la = GROUP_LABELS[a] || a;
      const lb = GROUP_LABELS[b] || b;
      return la.localeCompare(lb);
    });
    return sorted;
  }, [stats]);

  async function handleExport(format: 'csv' | 'json') {
    setExporting(true);
    try {
      const res = await fetch(
        `/api/admin/translations/export?locale=${selectedLocale}&format=${format}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translations-${selectedLocale}-${new Date().toISOString().slice(0, 10)}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported translations as ${format.toUpperCase()}`);
    } catch (err) {
      toast.error('Export failed');
    }
    setExporting(false);
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      let rows;

      if (file.name.endsWith('.json')) {
        rows = JSON.parse(text);
      } else if (file.name.endsWith('.csv')) {
        // Parse CSV
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        const localeCol = headers.findIndex((h: string) => h.trim() === selectedLocale);
        if (localeCol === -1) {
          toast.error(`Column "${selectedLocale}" not found in CSV`);
          setImporting(false);
          return;
        }
        rows = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const cols = parseCsvLine(lines[i]);
          const row: Record<string, string | number> = {};
          headers.forEach((h: string, idx: number) => {
            row[h.trim()] = cols[idx] || '';
          });
          row.segment_index = Number(row.segment_index) || 0;
          rows.push(row);
        }
      } else {
        toast.error('Unsupported file type. Use .json or .csv');
        setImporting(false);
        return;
      }

      const res = await fetch('/api/admin/translations/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ locale: selectedLocale, rows }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(`Imported ${result.imported} translations (${result.skipped} skipped)`);
        // Refresh data
        window.location.reload();
      } else {
        toast.error(result.error || 'Import failed');
      }
    } catch (err) {
      toast.error('Failed to parse file');
    }
    setImporting(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const statusBadge = (status: 'complete' | 'in-progress' | 'not-started') => {
    switch (status) {
      case 'complete':
        return <Badge variant="success">Complete</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="default">Not Started</Badge>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Translation Management</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage i18n translations across all locales</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Target Locale:</label>
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488]"
          >
            {availableLocales.map((loc) => (
              <option key={loc} value={loc}>{loc.toUpperCase()}</option>
            ))}
          </select>
          <div className="h-6 w-px bg-gray-200" />
          <button
            onClick={() => handleExport('csv')}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            JSON
          </button>
          {adminUser && hasPermission(adminUser.role, 'translations', 'import') && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Import
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                onChange={handleImportFile}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Layers className="w-5 h-5 text-[#0d9488]" />}
          label="Total Namespaces"
          value={loading ? '...' : namespaces.length.toString()}
        />
        <StatCard
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          label="English Segments"
          value={loading ? '...' : totalEnglish.toString()}
        />
        <StatCard
          icon={<Globe className="w-5 h-5 text-amber-600" />}
          label={`Translated (${selectedLocale.toUpperCase()})`}
          value={loading ? '...' : `${totalTranslated} / ${totalEnglish}`}
          subtitle={totalEnglish > 0 ? `${Math.round((totalTranslated / totalEnglish) * 100)}%` : '0%'}
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
          label={`Published (${selectedLocale.toUpperCase()})`}
          value={loading ? '...' : `${totalPublished} / ${totalEnglish}`}
          subtitle={totalEnglish > 0 ? `${Math.round((totalPublished / totalEnglish) * 100)}%` : '0%'}
        />
      </div>

      {/* Namespace Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            <span className="ml-2 text-sm text-gray-500">Loading namespaces...</span>
          </div>
        ) : namespaces.length === 0 ? (
          <div className="py-20 text-center">
            <Globe className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">No namespaces found</p>
            <p className="text-xs text-gray-400 mt-1">Add namespaces to start translating</p>
          </div>
        ) : (
          grouped.map(([prefix, items]) => (
            <div key={prefix}>
              <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {GROUP_LABELS[prefix] || prefix}
                </h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600 w-[30%]">Namespace</th>
                    <th className="text-center px-4 py-2.5 font-medium text-gray-600 w-[10%]">EN Segments</th>
                    <th className="text-center px-4 py-2.5 font-medium text-gray-600 w-[10%]">Translated</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600 w-[30%]">Progress</th>
                    <th className="text-center px-4 py-2.5 font-medium text-gray-600 w-[12%]">Status</th>
                    <th className="text-right px-4 py-2.5 font-medium text-gray-600 w-[8%]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <tr key={item.namespace.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">{item.namespace.name}</code>
                          {item.namespace.description && (
                            <p className="text-xs text-gray-400 mt-0.5">{item.namespace.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{item.englishCount}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{item.translatedCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.percentage === 100
                                  ? 'bg-green-500'
                                  : item.percentage > 0
                                  ? 'bg-amber-400'
                                  : 'bg-gray-200'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-10 text-right">{item.percentage}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">{statusBadge(item.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/translations/${encodeURIComponent(item.namespace.name)}?locale=${selectedLocale}`}
                          className="text-xs font-medium text-[#0d9488] hover:text-[#0f766e] hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Parse a single CSV line, handling quoted fields with commas/newlines.
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

function StatCard({
  icon,
  label,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-[#0f172a]">{value}</span>
        {subtitle && <span className="text-sm font-medium text-gray-400">{subtitle}</span>}
      </div>
    </div>
  );
}
