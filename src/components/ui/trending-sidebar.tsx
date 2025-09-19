import { TrendingUp, Users, Hash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Separator } from "./separator";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const trendingTopics = [
  { tag: "الصباح_الذهبي", posts: "15.2K منشور" },
  { tag: "التطوير_الذاتي", posts: "8.7K منشور" },
  { tag: "النجاح", posts: "12.1K منشور" },
  { tag: "قهوة", posts: "5.9K منشور" },
  { tag: "إلهام", posts: "9.4K منشور" },
];

const suggestedUsers = [
  {
    id: "1",
    name: "خالد السعدي",
    username: "@khaled_s",
    avatar: avatar1,
    followers: "125K",
    verified: true,
  },
  {
    id: "2",
    name: "منى أحمد",
    username: "@mona_a",
    avatar: avatar2,
    followers: "89K",
    verified: false,
  },
  {
    id: "3",
    name: "عمر محمد",
    username: "@omar_m",
    avatar: avatar3,
    followers: "67K",
    verified: true,
  },
];

export function TrendingSidebar() {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="gold-card p-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">الترندات</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.tag}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">#{index + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    #{topic.tag}
                  </p>
                  <p className="text-sm text-muted-foreground">{topic.posts}</p>
                </div>
              </div>
              <Hash className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="gold-card p-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">اقتراحات المتابعة</h2>
        </div>
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="story-ring">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <p className="font-semibold text-foreground text-sm">{user.name}</p>
                    {user.verified && (
                      <span className="text-primary text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.followers} متابع</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="btn-gold text-xs px-4">
                متابعة
              </Button>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <Button variant="ghost" className="w-full text-primary hover:text-primary-light">
          عرض المزيد
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="gold-card p-6">
        <h3 className="font-bold text-foreground mb-4">إحصائيات سريعة</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-2xl font-bold text-primary">2.4M</p>
            <p className="text-xs text-muted-foreground">مستخدم نشط</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-2xl font-bold text-primary">15.7K</p>
            <p className="text-xs text-muted-foreground">منشور اليوم</p>
          </div>
        </div>
      </div>
    </div>
  );
}