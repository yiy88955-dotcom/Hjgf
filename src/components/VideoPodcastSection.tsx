import React, { useState } from 'react';
import { Play, Mic, Radio, Volume2, Clock, Eye, Sparkles, ChevronLeft } from 'lucide-react';
import { PODCAST_DATA, VIDEO_STORIES } from '../data/newsData';
import { PodcastEpisode, VideoStory } from '../types';

interface VideoPodcastSectionProps {
  onPlayPodcast: (podcast: PodcastEpisode) => void;
  onOpenVideoModal: (video: VideoStory) => void;
}

export const VideoPodcastSection: React.FC<VideoPodcastSectionProps> = ({
  onPlayPodcast,
  onOpenVideoModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'podcast'>('all');

  return (
    <section className="w-full bg-[#12161c] text-white py-10 my-8 border-y border-[#2a2f38]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-700/80 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-7 bg-[#bb1919] inline-block"></span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>وسائط بي بي سي: بودكاست وفيديو</span>
                <span className="text-xs bg-[#bb1919] text-white px-2 py-0.5 font-bold uppercase rounded">
                  BBC MULTIMEDIA
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                تقارير مصورة حصرية، وثائقيات قصيرة، وحلقات بودكاست صوتية مميزة
              </p>
            </div>
          </div>

          <div className="flex items-center bg-[#1e232d] p-1 rounded-sm border border-gray-700 text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeTab === 'all' ? 'bg-[#bb1919] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1 ${
                activeTab === 'video' ? 'bg-[#bb1919] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>فيديوهات</span>
            </button>
            <button
              onClick={() => setActiveTab('podcast')}
              className={`px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1 ${
                activeTab === 'podcast' ? 'bg-[#bb1919] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>بودكاست</span>
            </button>
          </div>
        </div>

        {/* Video Highlights Grid */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <div className="mb-10">
            <div className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current text-amber-400" />
              <span>أبرز التقارير المصورة والوثائقيات</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIDEO_STORIES.map((video) => (
                <div
                  key={video.id}
                  onClick={() => onOpenVideoModal(video)}
                  className="bg-[#1a1f29] border border-gray-800 rounded-none overflow-hidden group cursor-pointer hover:border-[#bb1919] transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#bb1919] group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                      {video.duration}
                    </span>
                    <span className="absolute top-2 right-2 bg-[#bb1919] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {video.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-800">
                      <span>{video.reporter}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BBC Podcasts Showcase */}
        {(activeTab === 'all' || activeTab === 'podcast') && (
          <div>
            <div className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Mic className="w-4 h-4 text-amber-400" />
              <span>بودكاست بي بي سي عربي (BBC Podcasts)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PODCAST_DATA.map((pod) => (
                <div
                  key={pod.id}
                  onClick={() => onPlayPodcast(pod)}
                  className="bg-[#1a1f29] border border-gray-800 p-4 rounded-none group cursor-pointer hover:border-red-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden rounded-sm mb-3">
                      <img
                        src={pod.coverImage}
                        alt={pod.showTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded">
                          {pod.showTitle}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#bb1919] text-white flex items-center justify-center shadow">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-red-400 line-clamp-2 mb-2">
                      {pod.episodeTitle}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
                      {pod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                    <span>تقديم: {pod.host}</span>
                    <span className="font-mono text-gray-300">{pod.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
