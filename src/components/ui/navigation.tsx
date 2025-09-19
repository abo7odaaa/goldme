import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  Users,
  User, 
  Heart, 
  Settings,
  Crown,
  Plus,
  Bookmark
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

// Main navigation for desktop sidebar
const navigation = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "الأصدقاء", href: "/friends", icon: Users },
  { name: "الملف الشخصي", href: "/profile", icon: User },
  { name: "الإشعارات", href: "/notifications", icon: Heart, badge: 3 },
  { name: "الإعدادات", href: "/settings", icon: Settings },
];

// Mobile navigation with swapped icons as requested
const mobileNavigation = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "الأصدقاء", href: "/friends", icon: Users },
  { name: "الملف الشخصي", href: "/profile", icon: User },
  { name: "الإشعارات", href: "/notifications", icon: Heart, badge: 3 },
  { name: "الأعدادات", href: "/settings", icon: Settings },
];

// Top row actions
const topActions = [
  { name: "البحث", href: "/search", icon: Search },
  { name: "إنشاء قصة", href: "/create", icon: Plus },
  { name: "المحفوظات", href: "/saved", icon: Bookmark },
];

// Top Navigation for Mobile (moved from bottom)
export function TopNavigation() {
  const location = useLocation();

  return (
    <div className="lg:hidden">
      {/* Top Actions Row */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border w-full">
        <div className="flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 max-w-full overflow-hidden" dir="rtl">
          <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
            {topActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-200"
              >
                <action.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
            <h1 className="text-sm sm:text-lg font-bold text-gold">GOLD ME</h1>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <Crown className="h-3 w-3 sm:h-5 sm:w-5 text-background" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navigation Row */}
      <nav className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border w-full">
        <div className="flex justify-around items-center py-1.5 sm:py-2 px-2 max-w-full" dir="rtl">
          {mobileNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className="relative flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all duration-200 min-w-0 flex-1"
              >
                <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 h-3 w-3 sm:h-4 sm:w-4 p-0 flex items-center justify-center text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs mt-0.5 sm:mt-1 truncate max-w-full ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function SideNavigation() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`hidden lg:flex flex-col h-screen sticky top-0 gold-card rounded-none border-r-2 border-primary/20 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-background" />
            </div>
            {!isCollapsed && (
              <h1 className="text-2xl font-bold text-gold">GOLD ME</h1>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:text-primary"
          >
            {isCollapsed ? "→" : "←"}
          </Button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`relative flex items-center p-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
              }`}
            >
              <div className="relative">
                <item.icon className="h-6 w-6" />
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              {!isCollapsed && (
                <span className="ml-4 font-medium">{item.name}</span>
              )}
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Top Actions in Sidebar */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          {topActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="flex items-center p-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-200"
            >
              <action.icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-4 font-medium">{action.name}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}