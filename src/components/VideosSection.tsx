import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Video, X, ChevronLeft, ChevronRight, VolumeX, Volume2 } from 'lucide-react';
import { DoctorProfile } from '@/data/doctorProfile';

interface VideosSectionProps {
  id: string;
  doctor: DoctorProfile;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ id, doctor }) => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePlay = (videoId: string) => {
    if (playingVideoId && playingVideoId !== videoId) {
      videoRefs.current[playingVideoId]?.pause();
      videoRefs.current[playingVideoId]?.load(); // Reset video to poster frame
    }
    setPlayingVideoId(videoId);
    setIsMuted(true);
    videoRefs.current[videoId]?.play();
  };

  const handlePause = (videoId: string) => {
    videoRefs.current[videoId]?.pause();
    videoRefs.current[videoId]?.load(); // Reset video to poster frame
    if (playingVideoId === videoId) {
      setPlayingVideoId(null);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8; // Scrolls by 80% of visible width
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id={id} className="clinical-card bg-white p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#2E3523] flex items-center gap-3">
            <Video className="h-7 w-7 text-[#2E3523]" />
            Insights from Dr. Bhattacharya
          </h2>
          <p className="text-base text-[#6B6F66] mt-1">
            Short, practical clips on hormones, metabolism & weight health.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative px-0 md:px-4"> {/* Added horizontal padding */}
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Video Row */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-scroll snap-x snap-mandatory gap-4 pb-4 no-scrollbar"
        >
          {doctor.videos.map((video) => (
            <div 
              key={video.id}
              className="flex-none w-[320px] snap-start"
              onMouseEnter={() => handlePlay(video.id)}
              onMouseLeave={() => handlePause(video.id)}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div 
                    className="relative w-full h-[568px] rounded-[18px] overflow-hidden bg-black cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] border border-[#E4E7DF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#939F79] focus-visible:ring-offset-2"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <video
                      ref={el => videoRefs.current[video.id] = el}
                      src={video.video_url}
                      loop
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoadedData={(e) => {
                        // Set the current time to 0 to show the first frame
                        e.currentTarget.currentTime = 0;
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Overlays */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3"> {/* Adjusted padding */}
                      {/* Top-Right Play Icon (if not playing) */}
                      {!playingVideoId && (
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                          <Play className="h-4 w-4 text-[#2E3523] ml-1" />
                        </div>
                      )}
                      
                      {/* Bottom-Left Disclaimer Text (optional) */}
                      {video.disclaimer && (
                        <div className="absolute bottom-3 left-3 text-white text-[10px] drop-shadow-md max-w-[calc(100%-80px)] overflow-hidden whitespace-nowrap overflow-ellipsis">
                          {video.disclaimer}
                        </div>
                      )}

                      {/* Bottom-Right Duration Pill */}
                      <div className="absolute bottom-3 right-3 bg-[#2E3523] text-white text-xs font-medium px-3 py-1 rounded-full opacity-90">
                        <Clock className="h-3 w-3 inline-block mr-1" />
                        {video.duration}
                      </div>

                      {/* Mute/Unmute Icon on Hover (if playing) */}
                      {playingVideoId === video.id && (
                        <div 
                          className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                          }}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4 text-[#2E3523]" />
                          ) : (
                            <Volume2 className="h-4 w-4 text-[#2E3523]" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl p-0">
                  {selectedVideo && (
                    <div className="relative">
                      <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                        <video
                          controls
                          autoPlay
                          src={selectedVideo.video_url}
                          poster={selectedVideo.thumbnail}
                          className="w-full h-full object-contain"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#2E3523] mb-2">
                          {selectedVideo.title}
                        </h3>
                        <p className="text-[#6B6F66] leading-relaxed">
                          {selectedVideo.description}
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                          <Badge variant="secondary" className="bg-[#E4E7DF] text-[#6B6F66] border border-[#E4E7DF]">
                            <Clock className="h-3 w-3 mr-1" />
                            {selectedVideo.duration}
                          </Badge>
                          {selectedVideo.tags && selectedVideo.tags.map((tag: string, tagIndex: number) => (
                            <Badge key={tagIndex} variant="outline" className="bg-[#E4E7DF] text-[#6B6F66] border border-[#E4E7DF]">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 z-20 pointer-events-none"> {/* Adjusted padding */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#434A35] hover:text-[#2E3523] focus:outline-none focus:ring-2 focus:ring-[#939F79] focus:ring-offset-2 transition-all duration-200 pointer-events-auto"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scrollCarousel('right')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#434A35] hover:text-[#2E3523] focus:outline-none focus:ring-2 focus:ring-[#939F79] focus:ring-offset-2 transition-all duration-200 pointer-events-auto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {doctor.videos.length === 0 && (
        <div className="text-center py-12 text-[#6B6F66]">
          <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Insights from Dr. Bhattacharya coming soon...</p>
        </div>
      )}
    </section>
  );
};