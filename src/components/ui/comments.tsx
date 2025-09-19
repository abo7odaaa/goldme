import { useState } from "react";
import { Send, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

interface Comment {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  isReply?: boolean;
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

// Sample comments data with replies
const sampleComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "سارة أحمد",
      username: "@sara_ahmed",
      avatar: avatar1,
    },
    content: "منشور رائع! استمتعت بقراءته جداً 😊 هذا النوع من المحتوى مفيد جداً ويساعدني كثيراً في فهم الموضوع بشكل أعمق وأكثر وضوحاً",
    timestamp: "منذ دقيقتين",
    likes: 12,
    isLiked: false,
  },
  {
    id: "1-reply-1",
    user: {
      name: "أحمد محمد",
      username: "@ahmed_m",
      avatar: avatar2,
    },
    content: "أتفق معك تماماً! الموضوع شيق جداً",
    timestamp: "منذ دقيقة",
    likes: 3,
    isLiked: false,
    isReply: true,
  },
  {
    id: "2",
    user: {
      name: "أحمد محمد",
      username: "@ahmed_m",
      avatar: avatar2,
    },
    content: "شكراً لك على المشاركة، موضوع مفيد ومهم 👍 أعتقد أن هذا سيفيد الكثير من الناس وخاصة المبتدئين في هذا المجال",
    timestamp: "منذ 5 دقائق",
    likes: 8,
    isLiked: true,
  },
  {
    id: "2-reply-1",
    user: {
      name: "فاطمة خالد",
      username: "@fatima_k",
      avatar: avatar3,
    },
    content: "بالفعل موضوع مهم جداً ومفيد للجميع",
    timestamp: "منذ 3 دقائق",
    likes: 2,
    isLiked: false,
    isReply: true,
  },
  {
    id: "3",
    user: {
      name: "فاطمة خالد",
      username: "@fatima_k",
      avatar: avatar3,
    },
    content: "أحب هذا النوع من المحتوى، يا ريت المزيد 💫",
    timestamp: "منذ 10 دقائق",
    likes: 15,
    isLiked: false,
  },
  {
    id: "4",
    user: {
      name: "محمد علي",
      username: "@mohammed_ali",
      avatar: avatar1,
    },
    content: "موافق تماماً مع وجهة نظرك، أحسنت! هذا الموضوع يحتاج لمناقشة أكثر وأعتقد أنه من المواضيع المهمة التي يجب على الجميع معرفتها والاهتمام بها بشكل أكبر",
    timestamp: "منذ 15 دقيقة",
    likes: 6,
    isLiked: true,
  },
  {
    id: "4-reply-1",
    user: {
      name: "ليلى حسن",
      username: "@leila_hassan",
      avatar: avatar2,
    },
    content: "صحيح كلامك، الموضوع يستحق النقاش",
    timestamp: "منذ 12 دقيقة",
    likes: 1,
    isLiked: false,
    isReply: true,
  },
  {
    id: "4-reply-2",
    user: {
      name: "سارة أحمد",
      username: "@sara_ahmed",
      avatar: avatar1,
    },
    content: "أتمنى نشوف المزيد من هذه المواضيع المهمة",
    timestamp: "منذ 10 دقائق",
    likes: 2,
    isLiked: true,
    isReply: true,
  },
  {
    id: "5",
    user: {
      name: "ليلى حسن",
      username: "@leila_hassan",
      avatar: avatar2,
    },
    content: "تجربة مشابهة حدثت معي، شكراً للمشاركة 🙏",
    timestamp: "منذ 20 دقيقة",
    likes: 9,
    isLiked: false,
  },
];

export function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "أنت",
        username: "@you",
        avatar: avatar1,
      },
      content: newComment,
      timestamp: "الآن",
      likes: 0,
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Comments Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          التعليقات ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {comments.map((comment) => (
            <div key={comment.id} className={`flex space-x-3 rtl:space-x-reverse ${comment.isReply ? 'mr-8 rtl:ml-8 rtl:mr-0' : ''}`}>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <span className="font-semibold text-sm text-foreground">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground text-right break-words whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                  </p>
                </div>
                
                <div className="flex items-center mt-2 space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center space-x-1 rtl:space-x-reverse h-auto p-1 ${
                      comment.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{comment.likes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-primary h-auto p-1"
                  >
                    رد
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Add Comment */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={avatar1} alt="أنت" />
            <AvatarFallback>أ</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 flex space-x-2 rtl:space-x-reverse">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب تعليقاً..."
              className="flex-1 text-right"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddComment();
                }
              }}
            />
            <Button
              onClick={handleAddComment}
              size="sm"
              disabled={!newComment.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary-light flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}