import React, { useState } from 'react';
import { BarChart3, CheckCircle2, Vote, Sparkles, Clock, Users } from 'lucide-react';
import { DAILY_POLL } from '../data/newsData';
import { PollData } from '../types';

export const InteractivePoll: React.FC = () => {
  const [poll, setPoll] = useState<PollData>(DAILY_POLL);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!selectedOptionId || hasVoted) return;

    setPoll(prev => {
      const updatedOptions = prev.options.map(opt => {
        if (opt.id === selectedOptionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      return {
        ...prev,
        totalVotes: prev.totalVotes + 1,
        options: updatedOptions,
        userVotedId: selectedOptionId,
      };
    });

    setHasVoted(true);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-[#1b222c] to-[#12161f] text-white p-6 sm:p-8 rounded-sm shadow-md border-r-4 border-[#bb1919]">
        
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#bb1919] text-white text-xs font-black px-2.5 py-0.5 uppercase tracking-wider rounded">
              تصويت اليوم التفاعلي
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {poll.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{poll.totalVotes.toLocaleString('ar-EG')} مشارك</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{poll.endDate}</span>
            </span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white leading-snug mb-2">
          {poll.question}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 mb-6">
          {poll.description}
        </p>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {poll.options.map((option) => {
            const percentage = Math.round((option.votes / poll.totalVotes) * 100) || 0;
            const isSelected = selectedOptionId === option.id;
            const isUserChoice = poll.userVotedId === option.id;

            return (
              <div
                key={option.id}
                onClick={() => !hasVoted && setSelectedOptionId(option.id)}
                className={`relative overflow-hidden p-3.5 rounded border transition-all ${
                  hasVoted
                    ? isUserChoice
                      ? 'border-[#bb1919] bg-[#2a303c]'
                      : 'border-gray-700 bg-[#1e2430]'
                    : isSelected
                    ? 'border-red-500 bg-[#2d3444] cursor-pointer'
                    : 'border-gray-700 bg-[#1a1f2a] hover:bg-[#232936] cursor-pointer'
                }`}
              >
                {/* Visual Progress Bar fill when voted */}
                {hasVoted && (
                  <div
                    className={`absolute inset-y-0 right-0 ${
                      isUserChoice ? 'bg-red-950/60' : 'bg-gray-700/40'
                    } transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                )}

                <div className="relative flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 flex-1">
                    {!hasVoted && (
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#bb1919] bg-[#bb1919]' : 'border-gray-500'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </div>
                    )}
                    {isUserChoice && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    <span className={`font-semibold ${isSelected || isUserChoice ? 'text-white' : 'text-gray-200'}`}>
                      {option.text}
                    </span>
                  </div>

                  {hasVoted && (
                    <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                      <span className="text-gray-400">({option.votes.toLocaleString('ar-EG')} صوت)</span>
                      <span className="font-bold text-amber-300 text-sm">{percentage}%</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!hasVoted ? (
          <button
            onClick={handleVote}
            disabled={!selectedOptionId}
            className="bg-[#bb1919] hover:bg-[#990000] disabled:bg-gray-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded transition-all cursor-pointer flex items-center gap-2 shadow"
          >
            <Vote className="w-4 h-4" />
            <span>تأكيد التصويت الآن</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/40 px-3 py-2 rounded inline-flex">
            <CheckCircle2 className="w-4 h-4" />
            <span>شكراً لمشاركتك في تصويت بي بي سي عربي. تم تسجيل صوتك بنجاح!</span>
          </div>
        )}

      </div>
    </section>
  );
};
