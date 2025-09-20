import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Share2, Copy, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (shareText?: string) => void;
  postContent: string;
  postAuthor: string;
}

export function ShareModal({ isOpen, onClose, onShare, postContent, postAuthor }: ShareModalProps) {
  const [shareText, setShareText] = useState("");
  const [shareType, setShareType] = useState<'simple' | 'with-text'>('simple');

  const handleShare = () => {
    onShare(shareType === 'with-text' ? shareText : undefined);
    onClose();
    toast.success("تم مشاركة المنشور بنجاح!");
    setShareText("");
    setShareType('simple');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("تم نسخ الرابط!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            مشاركة المنشور
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* المنشور الأصلي */}
          <div className="p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">منشور {postAuthor}</p>
            <p className="text-sm line-clamp-3">{postContent}</p>
          </div>

          {/* خيارات المشاركة */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant={shareType === 'simple' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShareType('simple')}
                className="flex-1"
              >
                مشاركة بسيطة
              </Button>
              <Button
                variant={shareType === 'with-text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShareType('with-text')}
                className="flex-1"
              >
                مشاركة مع نص
              </Button>
            </div>

            {shareType === 'with-text' && (
              <Textarea
                placeholder="اكتب تعليقك على المنشور..."
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            )}
          </div>

          {/* أزرار الإجراء */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleShare} className="flex-1">
              <Send className="h-4 w-4 ml-2" />
              مشاركة
            </Button>
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}