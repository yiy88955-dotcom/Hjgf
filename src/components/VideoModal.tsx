import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Eye, Clock, Share2 } from 'lucide-react';
import { VideoStory } from '../types';

interface VideoModalProps {
  video: VideoStory | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#12161f] text-white w-full max-w-4xl rounded-sm border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-3.5 bg-[#1a202c] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#bb1919] text-white text-xs font-black px-2.5 py-0.5 rounded">
              فيديو بي بي سي
            </span>
            <span className="text-xs text-gray-400 font-bold">{video.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[16/9] bg-black">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>

        {/* Video Metadata */}
        <div className="p-5 bg-[#161b24]">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            {video.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
            {video.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 pt-3 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-300">{video.reporter}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {video.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {video.views}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('تم نسخ رابط الفيديو إلى الحافظة!');
                  }
                }}
                className="flex items-center gap-1 bg-[#222936] hover:bg-[#bb1919] hover:text-white px-3 py-1.5 rounded transition-colors text-gray-300"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة الفيديو</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
