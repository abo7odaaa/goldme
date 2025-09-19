import { useState } from "react";
import { Search as SearchIcon, TrendingUp, Users, Hash, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const recentSearches = [
  "التطوير الذاتي",
  "أحمد محمد",
  "#النجاح",
  "تصميم الواجهات",
  "ريادة الأعمال",
];

const trendingHashtags = [
  { tag: "الصباح_الذهبي", posts: "15.2K" },
  { tag: "التطوير_الذاتي", posts: "8.7K" },
  { tag: "النجاح", posts: "12.1K" },
  { tag: "قهوة", posts: "5.9K" },
  { tag: "إلهام", posts: "9.4K" },
  { tag: "تكنولوجيا", posts: "18.3K" },
  { tag: "ريادة", posts: "7.2K" },
  { tag: "تصميم", posts: "11.8K" },
];

const suggestedUsers = [
  {
    id: "1",
    name: "خالد السعدي",
    username: "@khaled_s",
    bio: "مؤسس شركة تقنية | محاضر في ريادة الأعمال",
    avatar: avatar1,
    followers: "125K",
    verified: true,
    isFollowing: false,
  },
  {
    id: "2",
    name: "منى أحمد",
    username: "@mona_a",
    bio: "مصممة UX/UI | شغوفة بتجربة المستخدم",
    avatar: avatar2,
    followers: "89K",
    verified: false,
    isFollowing: true,
  },
  {
    id: "3",
    name: "عمر محمد",
    username: "@omar_m",
    bio: "مطور تطبيقات | متخصص في React Native",
    avatar: avatar3,
    followers: "67K",
    verified: true,
    isFollowing: false,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [followingStates, setFollowingStates] = useState<{[key: string]: boolean}>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add search logic here
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleFollow = (userId: string) => {
    setFollowingStates(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const removeRecentSearch = (search: string) => {
    // Remove from recent searches
    console.log("إزالة من البحثات الأخيرة:", search);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 pb-20 lg:pb-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Header */}
        <div className="gold-card p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6 text-right">البحث</h1>
          
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن أشخاص، منشورات، أو هاشتاجز..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-12 text-right"
              dir="rtl"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {!searchQuery ? (
          /* Default Search Page */
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Searches */}
            <div className="gold-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 text-right">البحثات الأخيرة</h2>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer"
                    onClick={() => handleSearch(search)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(search);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-foreground">{search}</span>
                      <SearchIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Hashtags */}
            <div className="gold-card p-6">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">الهاشتاجز الرائجة</h2>
              </div>
              <div className="space-y-2">
                {trendingHashtags.map((hashtag, index) => (
                  <div
                    key={hashtag.tag}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                    onClick={() => handleSearch(`#${hashtag.tag}`)}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          #{hashtag.tag}
                        </p>
                        <p className="text-sm text-muted-foreground">{hashtag.posts} منشور</p>
                      </div>
                    </div>
                    <Hash className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 gold-card">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="people">أشخاص</TabsTrigger>
                <TabsTrigger value="posts">منشورات</TabsTrigger>
                <TabsTrigger value="hashtags">هاشتاجز</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-6">
                {/* People Results */}
                <div className="gold-card p-6">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">أشخاص</h3>
                  </div>
                  <div className="space-y-4">
                    {suggestedUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="story-ring">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <p className="font-semibold text-foreground">{user.name}</p>
                              {user.verified && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                  ✓
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.username}</p>
                            <p className="text-sm text-muted-foreground max-w-xs truncate">{user.bio}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={followingStates[user.id] || user.isFollowing ? "outline" : "default"}
                          onClick={() => toggleFollow(user.id)}
                          className={followingStates[user.id] || user.isFollowing ? "" : "btn-gold"}
                        >
                          {followingStates[user.id] || user.isFollowing ? "يتابع" : "متابعة"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* No Results for Posts */}
                <div className="gold-card p-6 text-center">
                  <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد منشورات</h3>
                  <p className="text-muted-foreground">جرب البحث بكلمات مختلفة</p>
                </div>
              </TabsContent>

              <TabsContent value="people" className="mt-6">
                <div className="gold-card p-6">
                  <div className="space-y-4">
                    {suggestedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="story-ring">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                              <p className="font-semibold text-foreground text-lg">{user.name}</p>
                              {user.verified && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                  ✓
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{user.username}</p>
                            <p className="text-muted-foreground max-w-sm">{user.bio}</p>
                            <p className="text-sm text-muted-foreground mt-1">{user.followers} متابع</p>
                          </div>
                        </div>
                        <Button
                          variant={followingStates[user.id] || user.isFollowing ? "outline" : "default"}
                          onClick={() => toggleFollow(user.id)}
                          className={followingStates[user.id] || user.isFollowing ? "" : "btn-gold"}
                        >
                          {followingStates[user.id] || user.isFollowing ? "يتابع" : "متابعة"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="posts" className="mt-6">
                <div className="gold-card p-6 text-center">
                  <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد منشورات</h3>
                  <p className="text-muted-foreground">جرب البحث بكلمات مختلفة أو تصفح الترندات</p>
                </div>
              </TabsContent>

              <TabsContent value="hashtags" className="mt-6">
                <div className="gold-card p-6">
                  <div className="space-y-2">
                    {trendingHashtags.filter(hashtag => 
                      hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase().replace('#', ''))
                    ).map((hashtag, index) => (
                      <div
                        key={hashtag.tag}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Hash className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg">
                              #{hashtag.tag}
                            </p>
                            <p className="text-muted-foreground">{hashtag.posts} منشور</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;