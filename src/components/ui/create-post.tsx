import { useState } from "react";
import { Image, Video, MapPin, Heart } from "lucide-react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Separator } from "./separator";

export function CreatePost() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      // Handle post submission
      console.log("نشر:", content);
      setContent("");
    }
  };

  return (
    <div className="gold-card p-3 sm:p-6 w-full overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="w-full">
          <Textarea
            placeholder="ما الذي يدور في بالك؟"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] sm:min-h-[100px] border-0 bg-transparent text-right placeholder:text-right resize-none focus:ring-0 text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
            dir="rtl"
          />
        </div>
        
        <Separator />
        
        {/* Media Options - Always Visible */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
            >
              <Image className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
              صورة
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
            >
              <Video className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
              فيديو
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
              أشعر بـ
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
              موقع
            </Button>
          </div>
          
          <div className="flex justify-end w-full sm:w-auto">
            <Button
              type="submit"
              className="btn-gold flex-1 sm:flex-none text-xs sm:text-sm px-4 sm:px-6"
              disabled={!content.trim()}
            >
              نشر
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}