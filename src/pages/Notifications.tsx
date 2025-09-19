import { useState } from "react";
import { Heart, MessageCircle, UserPlus, Share, AtSign, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

interface NotificationProps {
  id: string;
  type: "like" | "comment" | "follow" | "share" | "mention" | "premium";
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content?: string;
  timestamp: string;
  isRead: boolean;
  postPreview?: string;
}

const notifications: NotificationProps[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "سارة أحمد",
      username: "@sara_ahmed",
      avatar: avatar2,
      verified: false,
    },
    content: "أعجبت بمنشورك",
    postPreview: "صباح جديد مع قهوة ذهبية ☕️",
    timestamp: "منذ 5 دقائق",
    isRead: false,
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "خالد السعدي",
      username: "@khaled_s",
      avatar: avatar1,
      verified: true,
    },
    content: "علق على منشورك: \"رائع! شكراً للمشاركة\"",
    postPreview: "أفضل شيء في الحياة هو أن تحاط بالأشخاص...",
    timestamp: "منذ 15 دقيقة",
    isRead: false,
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "فاطمة خالد",
      username: "@fatima_k",
      avatar: avatar3,
      verified: true,
    },
    content: "بدأت متابعتك",
    timestamp: "منذ 30 دقيقة",
    isRead: false,
  },
  {
    id: "4",
    type: "share",
    user: {
      name: "عمر محمد",
      username: "@omar_m",
      avatar: avatar1,
      verified: false,
    },
    content: "شارك منشورك",
    postPreview: "التغيير يبدأ من الداخل 🌱",
    timestamp: "منذ ساعة",
    isRead: true,
  },
  {
    id: "5",
    type: "mention",
    user: {
      name: "منى أحمد",
      username: "@mona_a",
      avatar: avatar2,
      verified: false,
    },
    content: "ذكرك في منشور",
    postPreview: "شكراً @ahmed_m على النصائح القيمة",
    timestamp: "منذ 2 ساعة",
    isRead: true,
  },
  {
    id: "6",
    type: "premium",
    user: {
      name: "GOLD ME",
      username: "@goldme_official",
      avatar: "",
      verified: true,
    },
    content: "تهانينا! حصلت على عضوية GOLD ME Premium",
    timestamp: "منذ 3 ساعات",
    isRead: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-5 w-5 text-red-500" />;
    case "comment":
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case "follow":
      return <UserPlus className="h-5 w-5 text-green-500" />;
    case "share":
      return <Share className="h-5 w-5 text-purple-500" />;
    case "mention":
      return <AtSign className="h-5 w-5 text-orange-500" />;
    case "premium":
      return <Star className="h-5 w-5 text-primary" />;
    default:
      return <Heart className="h-5 w-5 text-muted-foreground" />;
  }
};

const getNotificationAction = (type: string) => {
  switch (type) {
    case "like":
      return "أعجب بمنشورك";
    case "comment":
      return "علق على منشورك";
    case "follow":
      return "بدأ متابعتك";
    case "share":
      return "شارك منشورك";
    case "mention":
      return "ذكرك في منشور";
    case "premium":
      return "إشعار مميز";
    default:
      return "";
  }
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  const markAsRead = (notificationId: string) => {
    setReadNotifications(prev => new Set([...prev, notificationId]));
  };

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadNotifications(new Set(allIds));
  };

  const isNotificationRead = (notification: NotificationProps) => {
    return notification.isRead || readNotifications.has(notification.id);
  };

  const unreadCount = notifications.filter(n => !isNotificationRead(n)).length;

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "mentions") return notification.type === "mention";
    if (activeTab === "likes") return notification.type === "like";
    if (activeTab === "comments") return notification.type === "comment";
    return true;
  });

  return (
    <div className="min-h-screen p-4 lg:p-8 pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="gold-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <h1 className="text-2xl font-bold text-foreground">الإشعارات</h1>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {unreadCount} جديد
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-primary hover:text-primary-light"
              >
                تحديد الكل كمقروء
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 gold-card">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="mentions">الإشارات</TabsTrigger>
              <TabsTrigger value="likes">الإعجابات</TabsTrigger>
              <TabsTrigger value="comments">التعليقات</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.map((notification) => {
            const isRead = isNotificationRead(notification);
            
            return (
              <div
                key={notification.id}
                className={`gold-card p-4 cursor-pointer transition-all duration-300 ${
                  !isRead 
                    ? 'border-l-4 border-primary bg-primary/5 hover:bg-primary/10' 
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  {/* Notification Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {notification.user.avatar ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-12 w-12 bg-gradient-gold rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-background" />
                      </div>
                    )}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                      <p className="font-semibold text-foreground">{notification.user.name}</p>
                      {notification.user.verified && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                          ✓
                        </Badge>
                      )}
                      {!isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-1">
                      {getNotificationAction(notification.type)}
                    </p>
                    
                    {notification.content && notification.type !== "premium" && (
                      <p className="text-foreground text-sm mb-2">{notification.content}</p>
                    )}
                    
                    {notification.postPreview && (
                      <div className="bg-muted/30 border border-border rounded-lg p-3 mt-2">
                        <p className="text-muted-foreground text-sm italic">
                          "{notification.postPreview}"
                        </p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                  </div>

                  {/* Action Button */}
                  {notification.type === "follow" && (
                    <Button size="sm" className="btn-gold">
                      متابعة
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="gold-card p-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد إشعارات</h3>
            <p className="text-muted-foreground">ستظهر إشعاراتك هنا عند وصولها</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;