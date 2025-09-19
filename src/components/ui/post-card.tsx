import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Separator } from "./separator";
import { ImageModal } from "./image-modal";
import { CustomVideoPlayer } from "./custom-video-player";
import { VideoModal } from "./video-modal";
import { CommentModal } from "./comment-modal";
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
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
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
    timestamp: "منذ ساعتين",
    isLiked: false,
    isSaved: true,
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
    timestamp: "منذ 4 ساعات",
    isLiked: true,
    isSaved: false,
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
    timestamp: "منذ 6 ساعات",
    isLiked: false,
    isSaved: true,
  },
  {
    id: "4",
    user: {
      name: "محمد علي",
      username: "@mohammed_ali",
      avatar: avatar1,
      verified: true,
    },
    content: "شعور رائع بالسعادة اليوم! 😊 تمكنت من إنجاز مشروعي الجديد وأشعر بالفخر والإنجاز. الحمد لله على كل شيء! 🙏 #سعادة #إنجاز",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: 256,
    comments: 42,
    shares: 18,
    timestamp: "منذ 8 ساعات",
    isLiked: true,
    isSaved: false,
  },
  {
    id: "5",
    user: {
      name: "ليلى حسن",
      username: "@leila_hassan",
      avatar: avatar2,
      verified: false,
    },
    content: "يوم صعب لكن تعلمت منه الكثير 😔 أحياناً الفشل يعلمنا أكثر من النجاح. سأعود أقوى إن شاء الله! 💪 #تعلم #قوة",
    likes: 189,
    comments: 56,
    shares: 12,
    timestamp: "منذ 10 ساعات",
    isLiked: false,
    isSaved: true,
  },
  {
    id: "6",
    user: {
      name: "عمر الشريف",
      username: "@omar_sherif",
      avatar: avatar3,
      verified: true,
    },
    content: "متحمس جداً لهذا المشروع الجديد! 🚀 العمل مع فريق رائع يجعل كل شيء ممكن. لنغير العالم معاً! ✨ #حماس #فريق_العمل",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: 445,
    comments: 89,
    shares: 67,
    timestamp: "منذ 12 ساعة",
    isLiked: true,
    isSaved: true,
  },
  {
    id: "7",
    user: {
      name: "نور الدين",
      username: "@nour_aldin",
      avatar: avatar1,
      verified: false,
    },
    content: "شعور بالهدوء والسكينة بعد جلسة تأمل رائعة 🧘‍♂️ الطبيعة تشفي الروح حقاً. أنصح الجميع بتجربة التأمل! 🌿 #تأمل #سكينة",
    image: post1,
    likes: 234,
    comments: 34,
    shares: 21,
    timestamp: "منذ 14 ساعة",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "8",
    user: {
      name: "رانيا مصطفى",
      username: "@rania_mostafa",
      avatar: avatar2,
      verified: true,
    },
    content: "غضبان من هذا الموقف! 😡 أحياناً الظلم يجعلني أفقد أعصابي. لكن سأحول هذا الغضب لطاقة إيجابية! 💢➡️💪 #غضب #تحويل_الطاقة",
    likes: 167,
    comments: 78,
    shares: 9,
    timestamp: "منذ 16 ساعة",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "9",
    user: {
      name: "حسام الدين",
      username: "@hossam_aldin",
      avatar: avatar3,
      verified: false,
    },
    content: "خائف قليلاً من التحدي الجديد 😰 لكن أعرف أن الخوف طبيعي عندما نخرج من منطقة الراحة. سأواجه مخاوفي! 🦁 #خوف #شجاعة",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: 298,
    comments: 45,
    shares: 23,
    timestamp: "منذ 18 ساعة",
    isLiked: true,
    isSaved: true,
  },
  {
    id: "10",
    user: {
      name: "إسراء محمود",
      username: "@esraa_mahmoud",
      avatar: avatar1,
      verified: true,
    },
    content: "مندهشة من جمال الغروب اليوم! 😲 الألوان كانت خيالية والمنظر يخطف الأنفاس. سبحان الخالق! 🌅 #دهشة #جمال_الطبيعة",
    image: post1,
    likes: 567,
    comments: 91,
    shares: 44,
    timestamp: "منذ 20 ساعة",
    isLiked: true,
    isSaved: true,
  },
  {
    id: "11",
    user: {
      name: "طارق أحمد",
      username: "@tarek_ahmed",
      avatar: avatar2,
      verified: false,
    },
    content: "محبط من النتائج اليوم 😞 كنت أتوقع أفضل من ذلك. لكن هذا لا يعني أنني سأستسلم! غداً يوم جديد 🌅 #إحباط #أمل",
    likes: 145,
    comments: 62,
    shares: 8,
    timestamp: "منذ 22 ساعة",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "12",
    user: {
      name: "منى سالم",
      username: "@mona_salem",
      avatar: avatar3,
      verified: true,
    },
    content: "ممتنة جداً لكل الأشخاص الرائعين في حياتي! 🙏 الامتنان يغير كل شيء ويجعل القلب مليء بالسعادة والحب 💕 #امتنان #حب",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    likes: 723,
    comments: 134,
    shares: 89,
    timestamp: "منذ يوم",
    isLiked: true,
    isSaved: true,
  },
  {
    id: "13",
    user: {
      name: "يوسف كريم",
      username: "@youssef_kareem",
      avatar: avatar1,
      verified: false,
    },
    content: "حزين قليلاً اليوم 😢 فقدت صديقاً عزيزاً. الذكريات الجميلة ستبقى في القلب للأبد. اللهم ارحمه واغفر له 🤲 #حزن #ذكريات",
    likes: 234,
    comments: 78,
    shares: 15,
    timestamp: "منذ يوم",
    isLiked: false,
    isSaved: true,
  },
  {
    id: "14",
    user: {
      name: "دينا عبدالله",
      username: "@dina_abdullah",
      avatar: avatar2,
      verified: true,
    },
    content: "واثقة من قدرتي على تحقيق أحلامي! 💪 الثقة بالنفس هي مفتاح النجاح. لا شيء مستحيل مع الإرادة القوية! ✨ #ثقة #إرادة",
    image: post1,
    likes: 456,
    comments: 67,
    shares: 38,
    timestamp: "منذ يوم",
    isLiked: true,
    isSaved: false,
  },
  {
    id: "15",
    user: {
      name: "كريم حسين",
      username: "@kareem_hussein",
      avatar: avatar3,
      verified: false,
    },
    content: "مرتبك من كثرة الخيارات أمامي 😵‍💫 أحياناً كثرة الفرص تجعل اتخاذ القرار صعباً. أحتاج لترتيب أفكاري! 🤔 #ارتباك #قرارات",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    likes: 189,
    comments: 43,
    shares: 19,
    timestamp: "منذ يومين",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "16",
    user: {
      name: "ياسمين علي",
      username: "@yasmin_ali",
      avatar: avatar1,
      verified: true,
    },
    content: "فخورة بإنجازي الجديد! 🏆 سنوات من العمل الشاق أثمرت أخيراً. الفخر شعور رائع عندما يكون مستحقاً! 🌟 #فخر #إنجاز",
    likes: 892,
    comments: 156,
    shares: 98,
    timestamp: "منذ يومين",
    isLiked: true,
    isSaved: true,
  },
  {
    id: "17",
    user: {
      name: "أحمد صلاح",
      username: "@ahmed_salah",
      avatar: avatar2,
      verified: false,
    },
    content: "قلق بشأن المستقبل 😟 التغييرات السريعة في العالم تجعلني أفكر كثيراً. لكن الإيمان بالله يطمئن القلب 🤲 #قلق #إيمان",
    image: post1,
    likes: 267,
    comments: 89,
    shares: 21,
    timestamp: "منذ يومين",
    isLiked: false,
    isSaved: true,
  },
  {
    id: "18",
    user: {
      name: "سلمى فؤاد",
      username: "@salma_fouad",
      avatar: avatar3,
      verified: true,
    },
    content: "مستمتعة بعطلة نهاية الأسبوع! 🎉 وقت الراحة ضروري لإعادة شحن الطاقة. سأستغل كل لحظة في الاسترخاء! 🏖️ #استمتاع #راحة",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    likes: 445,
    comments: 72,
    shares: 34,
    timestamp: "منذ 3 أيام",
    isLiked: true,
    isSaved: false,
  },
  {
    id: "19",
    user: {
      name: "مصطفى رامي",
      username: "@mostafa_rami",
      avatar: avatar1,
      verified: false,
    },
    content: "محرج من الموقف الذي حدث اليوم 😳 أحياناً الأخطاء تعلمنا دروساً مهمة. سأحرص على عدم تكرارها! 🤦‍♂️ #إحراج #تعلم",
    likes: 123,
    comments: 34,
    shares: 7,
    timestamp: "منذ 3 أيام",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "20",
    user: {
      name: "هبة محمد",
      username: "@heba_mohammed",
      avatar: avatar2,
      verified: true,
    },
    content: "راضية عن إنجازاتي هذا العام 😌 كل خطوة صغيرة أوصلتني لهنا. الرضا عن النفس نعمة كبيرة! ✨ #رضا #إنجازات",
    image: post1,
    likes: 678,
    comments: 145,
    shares: 67,
    timestamp: "منذ 3 أيام",
    isLiked: true,
    isSaved: true,
  },
];

export function PostCard({ post }: { post: PostProps }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
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

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-6 rtl:space-x-reverse overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse transition-all duration-300 flex-shrink-0 ${
              isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium text-xs sm:text-sm">{likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCommentModalOpen(true)}
            className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-primary transition-all duration-300 flex-shrink-0"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-xs sm:text-sm">{post.comments}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-primary transition-all duration-300 flex-shrink-0"
          >
            <Share className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-xs sm:text-sm">{post.shares}</span>
          </Button>
        </div>

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
      </div>

      {/* Image Modal */}
      {post.image && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          image={post.image}
          alt="منشور"
          likes={likes}
          comments={post.comments}
          shares={post.shares}
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={handleLike}
          onSave={handleSave}
        />
      )}

      {/* Video Modal */}
      {post.video && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoSrc={post.video}
          likes={likes}
          comments={post.comments}
          shares={post.shares}
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={handleLike}
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