import { useState } from "react";
import { Send, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

interface Reply {
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
}

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
  replies?: Reply[];
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

// Sample comments data with nested replies
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
    replies: [
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
      }
    ]
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
    replies: [
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
      }
    ]
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
    replies: [
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
      }
    ]
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
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const getTotalCommentsCount = () => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies?.length || 0);
    }, 0);
  };

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(comments.map(comment => {
      if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      
      if (isReply && comment.id === parentId && comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
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

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex space-x-3 rtl:space-x-reverse ${isReply ? 'mr-6 rtl:ml-6 rtl:mr-0' : ''}`}>
      <Avatar className={`${isReply ? 'h-6 w-6' : 'h-8 w-8'} flex-shrink-0`}>
        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
            <span className={`font-semibold ${isReply ? 'text-xs' : 'text-sm'} text-foreground`}>
              {comment.user.name}
            </span>
            <span className={`${isReply ? 'text-xs' : 'text-xs'} text-muted-foreground`}>
              {comment.timestamp}
            </span>
          </div>
          <p className={`${isReply ? 'text-xs' : 'text-sm'} text-foreground text-right break-words whitespace-pre-wrap leading-relaxed`}>
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
            <Heart className={`${isReply ? 'h-2.5 w-2.5' : 'h-3 w-3'} ${comment.isLiked ? 'fill-current' : ''}`} />
            <span className={isReply ? 'text-xs' : 'text-xs'}>{comment.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`${isReply ? 'text-xs' : 'text-xs'} text-muted-foreground hover:text-primary h-auto p-1`}
          >
            رد
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Comments Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <h3 className="text-lg font-semibold text-foreground">
          التعليقات ({getTotalCommentsCount()})
        </h3>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-4 p-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {renderComment(comment)}
              
              {/* Replies Section */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mr-6 rtl:ml-6 rtl:mr-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleReplies(comment.id)}
                    className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-primary h-auto p-1 mb-2"
                  >
                    {expandedReplies.has(comment.id) ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                    <span className="text-xs">
                      {expandedReplies.has(comment.id) 
                        ? 'إخفاء الردود' 
                        : `عرض ${comment.replies.length} رد${comment.replies.length > 1 ? 'ود' : ''}`
                      }
                    </span>
                  </Button>
                  
                  {expandedReplies.has(comment.id) && (
                    <div className="space-y-3">
                      {comment.replies.map((reply) => renderComment(reply, true))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Add Comment - Fixed positioning for mobile */}
      <div className="p-4 border-t border-border bg-background flex-shrink-0">
        <div className="flex space-x-2 rtl:space-x-reverse items-end">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={avatar1} alt="أنت" />
            <AvatarFallback>أ</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب تعليقاً..."
              className="text-right resize-none min-h-[40px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
          </div>
          
          <Button
            onClick={handleAddComment}
            size="sm"
            disabled={!newComment.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 h-[40px] px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}