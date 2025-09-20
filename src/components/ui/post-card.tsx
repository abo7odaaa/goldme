import { useState } from "react";
import { ThumbsUp, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Separator } from "./separator";
import { ImageModal } from "./image-modal";
import { CustomVideoPlayer } from "./custom-video-player";
import { VideoModal } from "./video-modal";
import { CommentModal } from "./comment-modal";
import { ReactionPicker } from "./reaction-picker";
import { ReactionDisplay } from "./reaction-display";
import { ShareModal } from "./share-modal";
import { useReactions } from "@/hooks/useReactions";
import { Link } from "react-router-dom";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import post1 from "@/assets/post-1.jpg";

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
  saves: number;
  reactions: Record<string, number>;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
  userReaction?: string;
}

const samplePosts: PostProps[] = [
  {
    id: "1",
    user: {
      name: "أحمد محمد",
      username: "@ahmed_m",
      avatar: avatar1,
      verified: true,
    },
    content: "صباح جديد مع قهوة ذهبية ☕️ البداية الجديدة تستحق الاحتفال! 🌟 #الصباح_الذهبي #قهوة",
    image: post1,
    likes: 342,
    comments: 28,
    shares: 15,
    saves: 45,
    reactions: { like: 256, love: 67, laugh: 19 },
    timestamp: "منذ ساعتين",
    isLiked: false,
    isSaved: true,
    userReaction: undefined,
  },
  {
    id: "2",
    user: {
      name: "سارة أحمد",
      username: "@sara_ahmed",
      avatar: avatar2,
      verified: false,
    },
    content: "أفضل شيء في الحياة هو أن تحاط بالأشخاص الذين يؤمنون بأحلامك ويدعمونك لتحقيقها 💫 الامتنان لكل من ساندني في رحلتي",
    likes: 521,
    comments: 67,
    shares: 34,
    saves: 89,
    reactions: { love: 334, like: 156, wow: 31 },
    timestamp: "منذ 4 ساعات",
    isLiked: true,
    isSaved: false,
    userReaction: "love",
  },
  {
    id: "3",
    user: {
      name: "فاطمة خالد",
      username: "@fatima_k",
      avatar: avatar3,
      verified: true,
    },
    content: "التغيير يبدأ من الداخل 🌱 كل يوم فرصة جديدة لتصبح النسخة الأفضل من نفسك. لا تستسلم أبداً! #التطوير_الذاتي #النجاح",
    likes: 789,
    comments: 123,
    shares: 89,
    saves: 234,
    reactions: { fire: 345, like: 298, strong: 146 },
    timestamp: "منذ 6 ساعات",
    isLiked: false,
    isSaved: true,
    userReaction: undefined,
  },
  {
    id: "4",
    user: {
      name: "محمد علي",
      username: "@mohammed_ali",
      avatar: avatar1,
      verified: true,
    },
    content: "الطبيعة علمتني أن الصبر يثمر دائماً 🌱 رحلة ألف ميل تبدأ بخطوة واحدة. هيا نبدأ معاً!",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: 234,
    comments: 45,
    shares: 67,
    saves: 123,
    reactions: { like: 198, clap: 36 },
    timestamp: "منذ 8 ساعات",
    isLiked: true,
    isSaved: false,
    userReaction: "like",
  },
  {
    id: "5",
    user: {
      name: "نور الدين",
      username: "@nour_eldeen",
      avatar: avatar2,
      verified: false,
    },
    content: "كل يوم جديد هو هدية من الله. اجعل كل لحظة تستحق العيش 🙏 الحمد لله على كل النعم",
    likes: 445,
    comments: 78,
    shares: 23,
    saves: 156,
    reactions: { pray: 267, love: 134, like: 44 },
    timestamp: "منذ 10 ساعات",
    isLiked: false,
    isSaved: true,
    userReaction: undefined,
  }
];

export function PostCard({ post }: { post: PostProps }) {
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [saves, setSaves] = useState(post.saves);
  const [shares, setShares] = useState(post.shares);
  const [comments] = useState(post.comments); // Real comment count
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isReactionPickerOpen, setIsReactionPickerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  
  const { 
    reactions, 
    currentUserReaction, 
    addReaction, 
    getTotalReactions 
  } = useReactions(post.reactions, post.userReaction);

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaves(isSaved ? saves - 1 : saves + 1);
  };

  const handleShare = (shareText?: string) => {
    // في التطبيق الحقيقي، هنا سيتم حفظ المشاركة فعلياً
    console.log('Share post:', post.id, shareText);
    setShares(shares + 1);
  };

  const handleLongPress = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPickerPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setIsReactionPickerOpen(true);
  };

  let pressTimer: NodeJS.Timeout;
  
  const handleMouseDown = (e: React.MouseEvent) => {
    pressTimer = setTimeout(() => {
      handleLongPress(e);
    }, 500); // نص ثانية كما طلب المستخدم
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  const handleClick = () => {
    // ضغطة واحدة = إعجاب افتراضي
    if (!isReactionPickerOpen) {
      addReaction('like');
    }
  };

  return (
    <article className="gold-card p-3 sm:p-6 animate-fade-in w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse min-w-0 flex-1">
          <Link to="/profile" className="story-ring transition-transform duration-200 hover:scale-105 flex-shrink-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse">
              <Link 
                to="/profile" 
                className="font-semibold text-foreground hover:text-primary transition-colors duration-200 text-sm sm:text-base truncate"
              >
                {post.user.name}
              </Link>
              {post.user.verified && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{post.user.username} • {post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary flex-shrink-0">
          <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-3 sm:mb-4">
        <p className="text-foreground leading-relaxed text-right text-sm sm:text-base break-words">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-3 sm:mb-4 rounded-lg overflow-hidden cursor-pointer w-full">
          <img 
            src={post.image} 
            alt="منشور" 
            className="w-full h-auto object-cover transition-transform duration-200 hover:brightness-110 max-w-full"
            onClick={() => setIsImageModalOpen(true)}
          />
        </div>
      )}

      {/* Video */}
      {post.video && (
        <div className="mb-3 sm:mb-4 w-full">
          <CustomVideoPlayer 
            src={post.video} 
            onFullscreen={() => setIsVideoModalOpen(true)}
          />
        </div>
      )}

      <Separator className="mb-3 sm:mb-4" />

      {/* Top Reactions Display */}
      {getTotalReactions() > 0 && (
        <div className="mb-3" dir="rtl">
          <ReactionDisplay 
            reactions={reactions}
            totalReactions={getTotalReactions()}
            onClick={() => console.log('Show reaction details')}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-6 rtl:space-x-reverse overflow-x-auto">
          {/* Reaction Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse transition-all duration-300 flex-shrink-0 ${
              currentUserReaction ? 'text-primary hover:text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleClick}
          >
            <ThumbsUp className={`h-4 w-4 sm:h-5 sm:w-5 ${currentUserReaction ? 'fill-current' : ''}`} />
            <span className="font-medium text-xs sm:text-sm">{getTotalReactions() || 'إعجاب'}</span>
          </Button>
          
          {/* Comment Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCommentModalOpen(true)}
            className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-primary transition-all duration-300 flex-shrink-0"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-xs sm:text-sm">{comments}</span>
          </Button>
          
          {/* Share Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-primary transition-all duration-300 flex-shrink-0"
          >
            <Share className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-xs sm:text-sm">{shares}</span>
          </Button>
        </div>

        {/* Save Button with count */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`transition-all duration-300 flex-shrink-0 ${
              isSaved ? 'text-primary hover:text-primary-light' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-xs text-muted-foreground mt-1">{saves}</span>
        </div>
      </div>

      {/* Reaction Picker */}
      <ReactionPicker
        isOpen={isReactionPickerOpen}
        onClose={() => setIsReactionPickerOpen(false)}
        onSelect={addReaction}
        position={pickerPosition}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShare}
        postContent={post.content}
        postAuthor={post.user.name}
      />

      {/* Image Modal */}
      {post.image && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          image={post.image}
          alt="منشور"
          likes={getTotalReactions()}
          comments={comments}
          shares={shares}
          isLiked={!!currentUserReaction}
          isSaved={isSaved}
          onLike={() => addReaction('like')}
          onSave={handleSave}
        />
      )}

      {/* Video Modal */}
      {post.video && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoSrc={post.video}
          likes={getTotalReactions()}
          comments={comments}
          shares={shares}
          isLiked={!!currentUserReaction}
          isSaved={isSaved}
          onLike={() => addReaction('like')}
          onSave={handleSave}
        />
      )}

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
      />
    </article>
  );
}

export function PostsFeed() {
  return (
    <div className="space-y-6">
      {samplePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}