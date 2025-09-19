import { Users, UserPlus, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

interface FriendProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  isOnline?: boolean;
  verified?: boolean;
}

const suggestedFriends: FriendProps[] = [
  {
    id: "1",
    name: "أحمد محمد",
    username: "@ahmed_m",
    avatar: avatar1,
    mutualFriends: 12,
    isOnline: true,
    verified: true,
  },
  {
    id: "2",
    name: "سارة أحمد",
    username: "@sara_ahmed",
    avatar: avatar2,
    mutualFriends: 8,
    isOnline: false,
  },
  {
    id: "3",
    name: "فاطمة خالد",
    username: "@fatima_k",
    avatar: avatar3,
    mutualFriends: 15,
    isOnline: true,
    verified: true,
  },
  {
    id: "4",
    name: "محمد علي",
    username: "@mohamed_ali",
    avatar: avatar1,
    mutualFriends: 5,
    isOnline: false,
  },
  {
    id: "5",
    name: "نور حسام",
    username: "@nour_h",
    avatar: avatar2,
    mutualFriends: 9,
    isOnline: true,
  },
];

const myFriends: FriendProps[] = [
  {
    id: "6",
    name: "علي حسن",
    username: "@ali_hassan",
    avatar: avatar3,
    mutualFriends: 20,
    isOnline: true,
    verified: true,
  },
  {
    id: "7",
    name: "ريم محمود",
    username: "@reem_m",
    avatar: avatar1,
    mutualFriends: 18,
    isOnline: false,
  },
  {
    id: "8",
    name: "خالد أحمد",
    username: "@khaled_a",
    avatar: avatar2,
    mutualFriends: 25,
    isOnline: true,
  },
];

function FriendCard({ friend, showAddButton = false }: { friend: FriendProps; showAddButton?: boolean }) {
  return (
    <div className="gold-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={friend.avatar} alt={friend.name} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {friend.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <h3 className="font-semibold text-foreground">{friend.name}</h3>
              {friend.verified && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{friend.username}</p>
            <p className="text-xs text-muted-foreground">
              {friend.mutualFriends} أصدقاء مشتركين
            </p>
          </div>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          {showAddButton ? (
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة صديق
            </Button>
          ) : (
            <Button size="sm" variant="outline">
              <MessageCircle className="h-4 w-4 ml-2" />
              رسالة
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const Friends = () => {
  return (
    <div className="min-h-screen px-4 py-6 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="gold-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">الأصدقاء</h1>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن الأصدقاء..."
            className="pr-10 bg-secondary border-border"
          />
        </div>
      </div>

      {/* Friend Suggestions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground px-2">اقتراحات الأصدقاء</h2>
        <div className="space-y-3">
          {suggestedFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} showAddButton />
          ))}
        </div>
      </div>

      {/* My Friends */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground px-2">أصدقائي ({myFriends.length})</h2>
        <div className="space-y-3">
          {myFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;