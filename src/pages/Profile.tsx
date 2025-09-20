import { useState } from "react";
import { MapPin, Calendar, Link as LinkIcon, Edit, Settings, Grid3X3, Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/ui/post-card";
import { Separator } from "@/components/ui/separator";
import avatar1 from "@/assets/avatar-1.jpg";
import heroImage from "@/assets/hero-image.jpg";
import post1 from "@/assets/post-1.jpg";

const userProfile = {
  name: "أحمد محمد",
  username: "@ahmed_m",
  bio: "مطور واجهات أمامية 💻 | محبب للقهوة ☕ | شغوف بالتكنولوجيا والابتكار 🚀 | أشارك خبراتي ومعرفتي مع المجتمع",
  avatar: avatar1,
  coverImage: heroImage,
  verified: true,
  followers: 12500,
  following: 890,
  posts: 156,
  location: "الرياض، السعودية",
  website: "ahmed-mohamed.dev",
  joinDate: "انضم في يناير 2020",
};

const userPosts = [
  {
    id: "user-1",
    user: {
      name: userProfile.name,
      username: userProfile.username,
      avatar: userProfile.avatar,
      verified: true,
    },
    content: "رحلة التطوير لا تتوقف أبداً 🚀 كل يوم نتعلم شيئاً جديداً ونصبح أفضل من الأمس. المهم هو الاستمرار والصبر والعمل الجاد.",
    image: post1,
    likes: 428,
    comments: 52,
    shares: 18,
    saves: 67,
    reactions: { like: 300, love: 89, fire: 39 },
    timestamp: "منذ يوم",
    isLiked: false,
    isSaved: false,
    userReaction: undefined,
  },
  {
    id: "user-2",
    user: {
      name: userProfile.name,
      username: userProfile.username,
      avatar: userProfile.avatar,
      verified: true,
    },
    content: "أفضل استثمار هو الاستثمار في نفسك وتطوير مهاراتك 📚 القراءة والتعلم المستمر هما سر النجاح في أي مجال",
    likes: 651,
    comments: 89,
    shares: 34,
    saves: 123,
    reactions: { like: 445, love: 156, hundred: 50 },
    timestamp: "منذ 3 أيام",
    isLiked: true,
    isSaved: true,
    userReaction: "like",
  },
];

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen pb-20 lg:pb-6">
      {/* Cover Image */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img 
          src={userProfile.coverImage} 
          alt="صورة الغلاف" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Edit Cover Button */}
        <Button 
          variant="secondary" 
          size="sm" 
          className="absolute top-4 right-4 bg-black/50 text-white border-white/20 hover:bg-black/70"
        >
          <Edit className="h-4 w-4 mr-2" />
          تعديل الغلاف
        </Button>
      </div>

      {/* Profile Info */}
      <div className="relative px-4 lg:px-8">
        {/* Avatar */}
        <div className="relative -mt-16 lg:-mt-20 mb-4">
          <div className="story-ring inline-block">
            <Avatar className="h-32 w-32 lg:h-40 lg:w-40 border-4 border-background">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Edit Profile Button */}
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 bg-background border-2 hover:bg-secondary"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{userProfile.name}</h1>
                {userProfile.verified && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    ✓ موثق
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{userProfile.username}</p>
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={() => setIsFollowing(!isFollowing)}
                className={isFollowing ? "" : "btn-gold"}
              >
                {isFollowing ? "إلغاء المتابعة" : "متابعة"}
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-foreground leading-relaxed text-right">{userProfile.bio}</p>

          {/* Additional Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <MapPin className="h-4 w-4" />
              <span>{userProfile.location}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <LinkIcon className="h-4 w-4" />
              <span className="text-primary hover:underline cursor-pointer">{userProfile.website}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Calendar className="h-4 w-4" />
              <span>{userProfile.joinDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 rtl:space-x-reverse">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{userProfile.posts.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">منشور</p>
            </div>
            <div className="text-center cursor-pointer hover:text-primary transition-colors">
              <p className="text-xl font-bold text-foreground">{userProfile.followers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">متابع</p>
            </div>
            <div className="text-center cursor-pointer hover:text-primary transition-colors">
              <p className="text-xl font-bold text-foreground">{userProfile.following.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">يتابع</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gold-card">
            <TabsTrigger value="posts" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Grid3X3 className="h-4 w-4" />
              <span>المنشورات</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bookmark className="h-4 w-4" />
              <span>المحفوظات</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Heart className="h-4 w-4" />
              <span>الإعجابات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6 space-y-6">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="text-center py-12">
              <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد منشورات محفوظة</h3>
              <p className="text-muted-foreground">المنشورات التي تحفظها ستظهر هنا</p>
            </div>
          </TabsContent>

          <TabsContent value="liked" className="mt-6">
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد منشورات مُعجب بها</h3>
              <p className="text-muted-foreground">المنشورات التي تعجب بها ستظهر هنا</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;