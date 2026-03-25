'use client';

import { useState } from 'react';
import { useAdmin } from './AdminContext';
import {
  Sparkles, X, FileText, PenLine, Expand, Search, Lightbulb,
  Type, MessageSquare, Copy, Check, Loader2,
} from 'lucide-react';

interface AIAssistantPanelProps {
  open: boolean;
  onClose: () => void;
  postTitle: string;
  selectedText?: string;
  fullContent: string;
  onInsert: (text: string) => void;
}

interface Message {
  id: string;
  action: string;
  result: string;
}

const actions = [
  { id: 'generate_outline', label: 'Generate Outline', icon: FileText, desc: 'Create a structured outline from the title' },
  { id: 'write_introduction', label: 'Write Introduction', icon: PenLine, desc: 'Generate a compelling intro paragraph' },
  { id: 'expand_selection', label: 'Expand Selection', icon: Expand, desc: 'Add more detail to selected text' },
  { id: 'improve_seo', label: 'Improve SEO', icon: Search, desc: 'Get SEO improvement suggestions' },
  { id: 'suggest_titles', label: 'Suggest Titles', icon: Lightbulb, desc: 'Generate alternative title options' },
  { id: 'generate_meta_description', label: 'Generate Meta Description', icon: Type, desc: 'Auto-generate SEO meta description' },
];

export default function AIAssistantPanel({ open, onClose, postTitle, selectedText, fullContent, onInsert }: AIAssistantPanelProps) {
  const { adminFetch } = useAdmin();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleAction(actionId: string) {
    setLoadingAction(actionId);
    try {
      const res = await adminFetch('/api/admin/ai-assist', {
        method: 'POST',
        body: JSON.stringify({
          action: actionId,
          postTitle,
          selectedText,
          fullContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newMsg: Message = {
          id: Date.now().toString(),
          action: actions.find(a => a.id === actionId)?.label || actionId,
          result: data.result,
        };
        setMessages(prev => [newMsg, ...prev]);
      }
    } catch {
      // Non-critical
    }
    setLoadingAction(null);
  }

  function handleCopy(msg: Message) {
    navigator.clipboard.writeText(msg.result);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col border-l border-gray-200">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#0d9488]" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs text-gray-500 mb-3">Choose an action:</p>
        <div className="grid grid-cols-2 gap-2">
          {actions.map(action => (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={!!loadingAction}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors disabled:opacity-50 text-left"
            >
              {loadingAction === action.id ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0 text-[#0d9488]" />
              ) : (
                <action.icon className="w-3.5 h-3.5 flex-shrink-0 text-[#0d9488]" />
              )}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Suggestions will appear here</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#0d9488]">{msg.action}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onInsert(msg.result)}
                    className="px-2 py-1 text-[10px] font-medium text-[#0d9488] border border-[#0d9488] rounded hover:bg-[#0d9488]/5"
                  >
                    Insert
                  </button>
                  <button
                    onClick={() => handleCopy(msg)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {msg.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
