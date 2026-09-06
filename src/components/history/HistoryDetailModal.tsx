import React from 'react';
import { X, Printer, Trash2, Calendar, Sprout, ShieldAlert, Sparkles, FlaskConical, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { HistoryItem } from '../../types/history';

interface HistoryDetailModalProps {
  item: HistoryItem | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({ item, onClose, onDelete }) => {
  if (!item) return null;

  const handlePrint = () => {
    window.print();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        id="printable-report"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800 flex items-start justify-between gap-4 sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              {item.type === 'disease' && <ShieldAlert className="w-5 h-5" />}
              {item.type === 'fertilizer' && <FlaskConical className="w-5 h-5" />}
              {item.type === 'chat' && <MessageSquare className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-500 dark:text-stone-400">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{item.timestamp}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{item.cropName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold border ${getStatusBadgeClass(
                item.statusBadge.variant
              )}`}
            >
              {item.statusBadge.text}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          {/* DISEASE SCAN REPORT */}
          {item.type === 'disease' && item.details.diseaseData && (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Image Preview & Severity */}
              {item.details.diseaseData.imagePreview && (
                <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 max-h-64 bg-stone-950 flex justify-center">
                  <img
                    src={item.details.diseaseData.imagePreview}
                    alt={item.details.diseaseData.diseaseName}
                    className="object-contain max-h-64 w-full"
                  />
                </div>
              )}

              <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between font-bold text-stone-800 dark:text-stone-200">
                  <span>রোগের নাম: {item.details.diseaseData.diseaseName}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Confidence: {item.details.diseaseData.confidence}%
                  </span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.details.diseaseData.description}
                </p>
              </div>

              {/* Organic Remedies */}
              {item.details.diseaseData.organicRemediation && item.details.diseaseData.organicRemediation.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-xs sm:text-sm">
                    <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>জৈব প্রতিকার ব্যবস্থা (Organic Remedies):</span>
                  </h3>
                  <ul className="space-y-1.5 pl-2">
                    {item.details.diseaseData.organicRemediation.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-stone-700 dark:text-stone-300 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chemical Remedies */}
              {item.details.diseaseData.chemicalRemediation && item.details.diseaseData.chemicalRemediation.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-xs sm:text-sm">
                    <FlaskConical className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>রাসায়নিক প্রতিকার প্রয়োগ পদ্ধতি (Chemical Control):</span>
                  </h3>
                  <ul className="space-y-1.5 pl-2">
                    {item.details.diseaseData.chemicalRemediation.map((chem, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-stone-700 dark:text-stone-300 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{chem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* FERTILIZER REPORT */}
          {item.type === 'fertilizer' && item.details.fertilizerData && (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block">ফসল</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 text-xs sm:text-sm">{item.details.fertilizerData.cropType}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block">জমির পরিমাণ</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 text-xs sm:text-sm">{item.details.fertilizerData.landArea} {item.details.fertilizerData.landUnit} ({item.details.fertilizerData.totalDecimals} শতক)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block">মাটির ধরণ</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 text-xs sm:text-sm">{item.details.fertilizerData.soilType}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">আনুমানিক খরচ</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-200 text-sm sm:text-base">৳{item.details.fertilizerData.estimatedCostBdt} BDT</span>
                </div>
              </div>

              {/* Fertilizer Quantities Table */}
              <div className="space-y-3">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                  সুপারিশকৃত সারের তালিকা (Fertilizer Quantities):
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      <tr>
                        <th className="p-3 font-semibold">সারের নাম</th>
                        <th className="p-3 font-semibold">মোট পরিমাণ</th>
                        <th className="p-3 font-semibold">প্রতি শতকে</th>
                        <th className="p-3 font-semibold">প্রয়োগের সময়</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800 bg-white dark:bg-stone-900">
                      {item.details.fertilizerData.fertilizers.map((fert) => (
                        <tr key={fert.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50">
                          <td className="p-3 font-bold text-stone-800 dark:text-stone-200">{fert.bengaliName} ({fert.name})</td>
                          <td className="p-3 font-extrabold text-emerald-700 dark:text-emerald-400">{fert.quantityKg} কেজি</td>
                          <td className="p-3 text-stone-600 dark:text-stone-400">{fert.perDecimalKg} কেজি</td>
                          <td className="p-3 text-stone-500 dark:text-stone-400">{fert.applicationTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Soil Advice */}
              {item.details.fertilizerData.soilHealthAdvice && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/80 space-y-1">
                  <h4 className="font-bold text-amber-800 dark:text-amber-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>মাটির উর্বরতা রক্ষা পরামর্শ:</span>
                  </h4>
                  <p className="text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
                    {item.details.fertilizerData.soilHealthAdvice}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* CHAT QUERY */}
          {item.type === 'chat' && item.details.chatData && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">কৃষকের প্রশ্ন:</span>
                <p className="font-medium text-sm">{item.details.chatData.userMessage}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-stone-800 dark:text-stone-200 space-y-2">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  কৃষিবন্ধু এআই উত্তর:
                </span>
                <p className="whitespace-pre-line leading-relaxed text-stone-700 dark:text-stone-200">
                  {item.details.chatData.aiReply}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>ডিলিট করুন</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>ডাউনলোড / প্রিন্ট</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
