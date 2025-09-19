import { useState } from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { PostCard } from "./post-card";
import { Comments } from "./comments";
import { useIsMobile } from "@/hooks/use-mobile";

interface PostProps {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostProps;
}

export function CommentModal({ isOpen, onClose, post }: CommentModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="bottom" 
          className="h-[85vh] max-h-[85vh] rounded-t-lg p-0 border-t-2 border-primary"
        >
          <SheetHeader className="p-4 pb-0">
            <div className="flex items-center justify-center">
              <SheetTitle className="text-foreground">التعليقات</SheetTitle>
            </div>
          </SheetHeader>
          <Comments postId={post.id} comments={[]} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background border-border">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-foreground">منشور مع التعليقات</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-4rem)]">
          {/* Post Section */}
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-l border-border overflow-y-auto">
            <PostCard post={post} />
          </div>
          
          {/* Comments Section */}
          <div className="lg:w-1/2 flex flex-col min-h-0">
            <Comments postId={post.id} comments={[]} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}