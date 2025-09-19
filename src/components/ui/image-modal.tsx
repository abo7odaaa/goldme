import { useState } from "react";
import { X, Heart, MessageCircle, Share, Bookmark, Download } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent } from "./dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: () => void;
  onSave?: () => void;
}

export function ImageModal({ 
  isOpen, 
  onClose, 
  image, 
  alt, 
  likes, 
  comments, 
  shares, 
  isLiked = false, 
  isSaved = false,
  onLike,
  onSave 
}: ImageModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

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

          {/* Image Container */}
          <div className="relative flex items-center justify-center w-full max-w-full max-h-[calc(90vh-120px)] overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={image} 
              alt={alt} 
              className={`w-full h-auto max-w-full max-h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onClick={(e) => e.stopPropagation()}
            />
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
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-primary transition-all duration-300 flex-shrink-0"
                >
                  <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}