import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

interface StoryProps {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  isViewed?: boolean;
  isOwn?: boolean;
}

const stories: StoryProps[] = [
  {
    id: "own",
    user: {
      name: "ستوريك",
      avatar: "",
    },
    isOwn: true,
  },
  {
    id: "1",
    user: {
      name: "أحمد",
      avatar: avatar1,
    },
    isViewed: false,
  },
  {
    id: "2",
    user: {
      name: "سارة",
      avatar: avatar2,
    },
    isViewed: true,
  },
  {
    id: "3",
    user: {
      name: "فاطمة",
      avatar: avatar3,
    },
    isViewed: false,
  },
  {
    id: "4",
    user: {
      name: "محمد",
      avatar: avatar1,
    },
    isViewed: true,
  },
  {
    id: "5",
    user: {
      name: "نور",
      avatar: avatar2,
    },
    isViewed: false,
  },
];

export function Stories() {
  return (
    <div className="gold-card p-3 sm:p-4 w-full overflow-hidden">
      <div className="flex space-x-3 sm:space-x-4 rtl:space-x-reverse overflow-x-auto scrollbar-hide pb-2">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 flex-shrink-0">
            {story.isOwn ? (
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary border-2 border-dashed border-primary/50 flex items-center justify-center cursor-pointer hover:bg-secondary/80 transition-colors">
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
              </div>
            ) : (
              <div className={`${story.isViewed ? 'opacity-60' : 'story-ring'} cursor-pointer transition-opacity`}>
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                  <AvatarImage src={story.user.avatar} alt={story.user.name} />
                  <AvatarFallback className="bg-secondary text-primary font-semibold">
                    {story.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            <span className="text-xs text-center text-muted-foreground font-medium max-w-[50px] sm:max-w-[70px] truncate">
              {story.user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}