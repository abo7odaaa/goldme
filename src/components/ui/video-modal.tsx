import { useState, useRef, useEffect } from "react";
import { X, Heart, MessageCircle, Share, Bookmark, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent } from "./dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: () => void;
  onSave?: () => void;
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  videoSrc, 
  likes, 
  comments, 
  shares, 
  isLiked = false, 
  isSaved = false,
  onLike,
  onSave 
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] p-0 bg-black/95 border-none w-full" hideCloseButton>
        <div 
          className="relative w-full h-full flex flex-col items-center justify-center"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-white hover:bg-white/10 rounded-full w-10 h-10"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Video Container */}
          <div 
            className="relative w-full max-w-full max-h-[calc(90vh-120px)] rounded-xl overflow-hidden"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-auto object-cover"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            />

            {/* Video Controls Overlay */}
            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 hover:scale-110 transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 fill-current" />
                  ) : (
                    <Play className="h-8 w-8 fill-current ml-1" />
                  )}
                </Button>
              </div>

              {/* Bottom Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                {/* Progress Bar */}
                <div 
                  className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3 relative group/progress"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-150 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 shadow-lg" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:text-primary hover:bg-white/20 transition-all duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-white hover:text-primary hover:bg-white/20 transition-all duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>

                    <span className="text-white text-xs font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 sm:space-x-6 rtl:space-x-reverse overflow-x-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLike}
                  className={`flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse transition-all duration-300 flex-shrink-0 ${
                    isLiked ? 'text-red-500 hover:text-red-600' : 'text-white hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 sm:h-6 sm:w-6 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium text-sm sm:text-lg">{likes}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-white hover:text-primary transition-all duration-300 flex-shrink-0"
                >
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="font-medium text-sm sm:text-lg">{comments}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-white hover:text-primary transition-all duration-300 flex-shrink-0"
                >
                  <Share className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="font-medium text-sm sm:text-lg">{shares}</span>
                </Button>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSave}
                  className={`transition-all duration-300 flex-shrink-0 ${
                    isSaved ? 'text-primary hover:text-primary-light' : 'text-white hover:text-primary'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 sm:h-6 sm:w-6 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}