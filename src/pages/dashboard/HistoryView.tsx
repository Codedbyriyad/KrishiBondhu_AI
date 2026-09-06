import React, { useState, useEffect } from 'react';
import {
  History,
  Search,
  Trash2,
  Printer,
  ShieldAlert,
  FlaskConical,
  MessageSquare,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { HistoryService } from '../../services/historyService';
import type { HistoryItem, HistoryCategory } from '../../types/history';
import { HistoryDetailModal } from '../../components/history/HistoryDetailModal';

export const HistoryView: React.FC = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | HistoryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const loaded = HistoryService.getHistoryItems();
    setItems(loaded);
  }, []);

  const handleDeleteItem = (id: string) => {
    const updated = HistoryService.deleteHistoryItem(id);
    setItems(updated);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleClearAll = () => {
    const updated = HistoryService.clearAllHistory();
    setItems(updated);
    setShowClearConfirm(false);
    setSelectedItem(null);
  };

  const handlePrintAll = () => {
    window.print();
  };

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const getCategoryIcon = (type: HistoryCategory) => {
    switch (type) {
      case 'disease':
        return <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'fertilizer':
        return <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
    }
  };

  const getStatusBadgeClass = (variant: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'success':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200 dark:border-sky-800';
    }
  };

  const counts = {
    all: items.length,
    disease: items.filter((i) => i.type === 'disease').length,
    fertilizer: items.filter((i) => i.type === 'fertilizer').length,
    chat: items.filter((i) => i.type === 'chat').length,
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>📜 সংরক্ষিত হিস্ট্রি ও রিপোর্ট (Activity History)</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            আপনার পূর্ববর্তী রোগ নির্ণয়, সারের পরিমাণ হিসাব ও কৃষিবন্ধু এআই পরামর্শের তালিকা।
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintAll}
              className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>প্রিন্ট রিপোর্ট</span>
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>মুছে ফেলুন (Clear All)</span>
            </button>
          </div>
        )}
      </div>

      {/* Controls: Search & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            সব ({counts.all})
          </button>
          <button
            onClick={() => setActiveTab('disease')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'disease'
                ? 'bg-white dark:bg-stone-900 text-rose-700 dark:text-rose-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>রোগ নির্ণয় ({counts.disease})</span>
          </button>
          <button
            onClick={() => setActiveTab('fertilizer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fertilizer'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-emerald-500" />
            <span>সারের হিসাব ({counts.fertilizer})</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-white dark:bg-stone-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
            <span>প্রশ্নোত্তর ({counts.chat})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="খুঁজুন (যেমন: ধান, আলু, সার)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* History Items List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 shadow-2xs hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(item.type)}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusBadgeClass(
                        item.statusBadge.variant
                      )}`}
                    >
                      {item.statusBadge.text}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.cropName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>বিস্তারিত</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  title="ডিলিট করুন"
                  className="p-1.5 rounded-xl text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-3">
          <History className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto" />
          <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
            কোন হিস্ট্রি পাওয়া যায়নি (No History Records)
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            আপনি নতুন কোনো রোগ নির্ণয় বা সারের হিসাব করলে তা এখানে স্বয়ংক্রিয়ভাবে সংরক্ষিত হবে।
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <HistoryDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={handleDeleteItem}
      />

      {/* Clear Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full border border-stone-200 dark:border-stone-800 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              সকল হিস্ট্রি মুছে ফেলতে চান?
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              এই প্রক্রিয়াটি বাতিল করা সম্ভব নয়। আপনার সংরক্ষিত সকল রোগ নির্ণয় ও সারের হিসাব মুছে যাবে।
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                বাতিল করুন
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
