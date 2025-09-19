import { Stories } from "@/components/ui/stories";
import { CreatePost } from "@/components/ui/create-post";
import { PostsFeed } from "@/components/ui/post-card";

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-6 w-full">
        {/* Stories */}
        <Stories />
        
        {/* Create Post */}
        <CreatePost />
        
        {/* Posts Feed */}
        <PostsFeed />
      </div>
    </div>
  );
};

export default Home;