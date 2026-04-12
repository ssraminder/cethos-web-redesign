'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Check, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { hasPermission } from '@/lib/admin/permissions';

const ALL_LOCALES = ['fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru'];

interface Namespace {
  id: string;
  name: string;
  description: string | null;
  page_path: string | null;
}

interface Segment {
  id: string | null; // null if target doesn't exist yet
  namespace_id: string;
  key: string;
  segment_index: number;
  sourceValue: string;
  targetValue: string;
  status: string;
  context_note: string | null;
  translator_note: string | null;
  max_length: number | null;
  confirmed_at: string | null;
  confirmed_by: string | null;
  dirty: boolean;
}

function statusDot(status: string) {
  switch (status) {
    case 'published':
      return 'bg-blue-500';
    case 'confirmed':
      return 'bg-green-500';
    case 'draft':
      return 'bg-yellow-400';
    default:
      return 'bg-gray-300';
  }
}

function statusLabel(status: string) {
  switch (status) {
    case 'published':
      return 'Published';
    case 'confirmed':
      return 'Confirmed';
    case 'draft':
      return 'Draft';
    default:
      return 'Untranslated';
  }
}

export default function NamespaceEditorPage() {
  const { adminUser } = useAdmin();
  const params = useParams();
  const searchParams = useSearchParams();
  const namespaceName = decodeURIComponent(params.namespace as string);
  const initialLocale = searchParams.get('locale') || 'fr';

  const [namespace, setNamespace] = useState<Namespace | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocale, setSelectedLocale] = useState(initialLocale);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [syncing, setSyncing] = useState(false);
  const savingRef = useRef(saving);
  savingRef.current = saving;

  // Filter locales based on user's assigned_locales
  const availableLocales = adminUser?.assigned_locales
    ? ALL_LOCALES.filter((l) => adminUser.assigned_locales!.includes(l))
    : ALL_LOCALES;

  const fetchData = useCallback(async () => {
    setLoading(true);
    const supabase = createBrowserSupabaseClient()!;

    // Get namespace
    const { data: nsData } = await supabase
      .from('cethosweb_i18n_namespaces')
      .select('*')
      .eq('name', namespaceName)
      .single();

    if (!nsData) {
      setLoading(false);
      return;
    }
    setNamespace(nsData);

    // Get English source segments
    const { data: enData } = await supabase
      .from('cethosweb_i18n_translations')
      .select('*')
      .eq('namespace_id', nsData.id)
      .eq('locale', 'en')
      .order('key')
      .order('segment_index');

    // Get target locale segments
    const { data: targetData } = await supabase
      .from('cethosweb_i18n_translations')
      .select('*')
      .eq('namespace_id', nsData.id)
      .eq('locale', selectedLocale)
      .order('key')
      .order('segment_index');

    // Build a map of target segments by key+segment_index
    const targetMap = new Map<string, typeof targetData extends (infer T)[] | null ? T : never>();
    if (targetData) {
      for (const t of targetData) {
        targetMap.set(`${t.key}:${t.segment_index}`, t);
      }
    }

    // Merge into side-by-side segments
    const merged: Segment[] = (enData || []).map((en) => {
      const target = targetMap.get(`${en.key}:${en.segment_index}`);
      return {
        id: target?.id || null,
        namespace_id: nsData.id,
        key: en.key,
        segment_index: en.segment_index,
        sourceValue: en.value || '',
        targetValue: target?.value || '',
        status: target?.status || 'untranslated',
        context_note: en.context_note || null,
        translator_note: target?.translator_note || null,
        max_length: en.max_length || null,
        confirmed_at: target?.confirmed_at || null,
        confirmed_by: target?.confirmed_by || null,
        dirty: false,
      };
    });

    setSegments(merged);
    setLoading(false);
  }, [namespaceName, selectedLocale]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const allConfirmed = segments.length > 0 && segments.every(
    (s) => s.status === 'confirmed' || s.status === 'published'
  );

  async function saveSegment(index: number) {
    const seg = segments[index];
    if (!seg.dirty) return;

    const segKey = `${seg.key}:${seg.segment_index}`;
    setSaving((prev) => ({ ...prev, [segKey]: true }));

    const supabase = createBrowserSupabaseClient()!;

    const newStatus = seg.targetValue.trim() === '' ? 'untranslated' : 'draft';

    if (seg.id) {
      // Update existing
      const { error } = await supabase
        .from('cethosweb_i18n_translations')
        .update({
          value: seg.targetValue,
          status: seg.status === 'published' ? 'published' : newStatus,
          translator_note: seg.translator_note,
        })
        .eq('id', seg.id);

      if (error) {
        toast.error(`Failed to save: ${error.message}`);
      }
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('cethosweb_i18n_translations')
        .insert({
          namespace_id: seg.namespace_id,
          key: seg.key,
          segment_index: seg.segment_index,
          locale: selectedLocale,
          value: seg.targetValue,
          status: newStatus,
          translator_note: seg.translator_note,
        })
        .select()
        .single();

      if (error) {
        toast.error(`Failed to save: ${error.message}`);
      } else if (data) {
        setSegments((prev) =>
          prev.map((s, i) => (i === index ? { ...s, id: data.id, status: newStatus, dirty: false } : s))
        );
        setSaving((prev) => ({ ...prev, [segKey]: false }));
        return;
      }
    }

    setSegments((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, status: s.targetValue.trim() === '' ? 'untranslated' : (s.status === 'published' ? 'published' : newStatus), dirty: false } : s
      )
    );
    setSaving((prev) => ({ ...prev, [segKey]: false }));
  }

  async function confirmSegment(index: number) {
    const seg = segments[index];
    if (!seg.targetValue.trim()) {
      toast.error('Cannot confirm an empty translation');
      return;
    }

    // Save first if dirty
    if (seg.dirty) {
      await saveSegment(index);
    }

    const supabase = createBrowserSupabaseClient()!;
    const segKey = `${seg.key}:${seg.segment_index}`;
    setSaving((prev) => ({ ...prev, [segKey]: true }));

    // Need to get the latest id in case it was just inserted
    const currentSeg = segments[index];

    if (currentSeg.id) {
      const { error } = await supabase
        .from('cethosweb_i18n_translations')
        .update({
          status: 'confirmed',
          confirmed_at: new Date().toISOString(),
          confirmed_by: adminUser?.email || 'admin',
        })
        .eq('id', currentSeg.id);

      if (error) {
        toast.error(`Failed to confirm: ${error.message}`);
      } else {
        setSegments((prev) =>
          prev.map((s, i) =>
            i === index
              ? { ...s, status: 'confirmed', confirmed_at: new Date().toISOString(), confirmed_by: adminUser?.email || 'admin' }
              : s
          )
        );
        toast.success(`Confirmed: ${seg.key}`);
      }
    } else {
      // Insert then confirm
      const { data, error } = await supabase
        .from('cethosweb_i18n_translations')
        .insert({
          namespace_id: seg.namespace_id,
          key: seg.key,
          segment_index: seg.segment_index,
          locale: selectedLocale,
          value: seg.targetValue,
          status: 'confirmed',
          confirmed_at: new Date().toISOString(),
          confirmed_by: adminUser?.email || 'admin',
        })
        .select()
        .single();

      if (error) {
        toast.error(`Failed to confirm: ${error.message}`);
      } else if (data) {
        setSegments((prev) =>
          prev.map((s, i) =>
            i === index
              ? { ...s, id: data.id, status: 'confirmed', confirmed_at: new Date().toISOString(), dirty: false }
              : s
          )
        );
        toast.success(`Confirmed: ${seg.key}`);
      }
    }

    setSaving((prev) => ({ ...prev, [segKey]: false }));
  }

  async function syncToLive() {
    if (!allConfirmed) return;
    setSyncing(true);

    const supabase = createBrowserSupabaseClient()!;
    const ids = segments.filter((s) => s.id && s.status === 'confirmed').map((s) => s.id!);

    if (ids.length > 0) {
      const { error } = await supabase
        .from('cethosweb_i18n_translations')
        .update({ status: 'published' })
        .in('id', ids);

      if (error) {
        toast.error(`Sync failed: ${error.message}`);
      } else {
        setSegments((prev) =>
          prev.map((s) => (s.status === 'confirmed' ? { ...s, status: 'published' } : s))
        );
        toast.success(`Published ${ids.length} segments to live`);
      }
    }

    setSyncing(false);
  }

  function updateTargetValue(index: number, value: string) {
    setSegments((prev) =>
      prev.map((s, i) => (i === index ? { ...s, targetValue: value, dirty: true } : s))
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-4">
        <Link href="/admin/translations" className="text-gray-500 hover:text-gray-900 transition-colors">
          Translations
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-medium">{namespaceName}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">{namespaceName}</h1>
          {namespace?.description && (
            <p className="text-sm text-[#64748b] mt-1">{namespace.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488]"
          >
            {availableLocales.map((loc) => (
              <option key={loc} value={loc}>{loc.toUpperCase()}</option>
            ))}
          </select>
          {adminUser && hasPermission(adminUser.role, 'translations', 'publish') && (
            <button
              onClick={syncToLive}
              disabled={!allConfirmed || syncing}
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Sync to Live
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {!loading && (
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <span>{segments.length} segments</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${statusDot('confirmed')}`} />
            {segments.filter((s) => s.status === 'confirmed').length} confirmed
          </span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${statusDot('published')}`} />
            {segments.filter((s) => s.status === 'published').length} published
          </span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${statusDot('draft')}`} />
            {segments.filter((s) => s.status === 'draft').length} draft
          </span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${statusDot('untranslated')}`} />
            {segments.filter((s) => s.status === 'untranslated').length} untranslated
          </span>
        </div>
      )}

      {/* Editor */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            <span className="ml-2 text-sm text-gray-500">Loading segments...</span>
          </div>
        ) : !namespace ? (
          <div className="py-20 text-center">
            <p className="text-sm font-medium text-gray-500">Namespace not found</p>
            <Link href="/admin/translations" className="text-sm text-[#0d9488] hover:underline mt-2 inline-block">
              Back to Translations
            </Link>
          </div>
        ) : segments.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm font-medium text-gray-500">No English source segments found</p>
            <p className="text-xs text-gray-400 mt-1">Add English segments first before translating</p>
          </div>
        ) : (
          <div>
            {/* Table header */}
            <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-0 border-b border-gray-100 bg-gray-50/50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="px-4 py-2.5 w-10"></div>
              <div className="px-4 py-2.5">English Source</div>
              <div className="px-4 py-2.5">{selectedLocale.toUpperCase()} Translation</div>
              <div className="px-4 py-2.5 w-20 text-center">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-50">
              {segments.map((seg, index) => {
                const segKey = `${seg.key}:${seg.segment_index}`;
                const isSaving = saving[segKey];

                return (
                  <div
                    key={segKey}
                    className="grid grid-cols-[auto_1fr_1fr_auto] gap-0 hover:bg-[#f8fafc] transition-colors"
                  >
                    {/* Status dot */}
                    <div className="px-4 py-3 flex items-start pt-4 w-10">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${statusDot(seg.status)} shrink-0`}
                        title={statusLabel(seg.status)}
                      />
                    </div>

                    {/* English source */}
                    <div className="px-4 py-3 border-r border-gray-50">
                      <div className="text-xs text-gray-400 font-mono mb-1">{seg.key}{seg.segment_index > 0 ? `[${seg.segment_index}]` : ''}</div>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded px-3 py-2 min-h-[40px]">
                        {seg.sourceValue}
                      </div>
                      {seg.context_note && (
                        <p className="text-xs text-gray-400 mt-1 italic">Context: {seg.context_note}</p>
                      )}
                    </div>

                    {/* Target translation */}
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">
                          {seg.dirty && <span className="text-amber-500 font-medium">Unsaved </span>}
                          {isSaving && <span className="text-blue-500 font-medium">Saving...</span>}
                        </span>
                        {seg.max_length && (
                          <span
                            className={`text-xs ${
                              seg.targetValue.length > seg.max_length
                                ? 'text-red-500 font-medium'
                                : 'text-gray-400'
                            }`}
                          >
                            {seg.targetValue.length}/{seg.max_length}
                          </span>
                        )}
                      </div>
                      <textarea
                        value={seg.targetValue}
                        onChange={(e) => updateTargetValue(index, e.target.value)}
                        onBlur={() => saveSegment(index)}
                        rows={Math.max(2, Math.ceil(seg.sourceValue.length / 80))}
                        className={`w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] ${
                          seg.max_length && seg.targetValue.length > seg.max_length
                            ? 'border-red-300 bg-red-50/50'
                            : 'border-gray-200'
                        }`}
                        placeholder="Enter translation..."
                      />
                      {seg.translator_note && (
                        <p className="text-xs text-gray-400 mt-1 italic">Note: {seg.translator_note}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-4 py-3 flex items-start pt-4 w-20 justify-center">
                      <button
                        onClick={() => confirmSegment(index)}
                        disabled={isSaving || !seg.targetValue.trim() || seg.status === 'confirmed' || seg.status === 'published'}
                        className={`p-1.5 rounded transition-colors ${
                          seg.status === 'confirmed' || seg.status === 'published'
                            ? 'text-green-500 bg-green-50 cursor-default'
                            : seg.targetValue.trim()
                            ? 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            : 'text-gray-200 cursor-not-allowed'
                        }`}
                        title={seg.status === 'confirmed' ? 'Already confirmed' : seg.status === 'published' ? 'Already published' : 'Confirm translation'}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
