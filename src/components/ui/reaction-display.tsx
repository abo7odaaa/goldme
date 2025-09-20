import { getTopReactions } from "@/lib/emojis";

interface ReactionDisplayProps {
  reactions: Record<string, number>;
  totalReactions: number;
  onClick?: () => void;
}

export function ReactionDisplay({ reactions, totalReactions, onClick }: ReactionDisplayProps) {
  const topReactions = getTopReactions(reactions);

  if (totalReactions === 0) return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-1 space-x-reverse text-muted-foreground hover:text-primary transition-colors duration-200"
      dir="rtl"
    >
      {/* أعلى 3 تفاعلات متداخلة */}
      <div className="flex items-center -space-x-1 space-x-reverse">
        {topReactions.map((reaction, index) => (
          <span
            key={reaction.name}
            className="text-lg"
            style={{
              zIndex: 10 - index,
            }}
          >
            {reaction.emoji}
          </span>
        ))}
      </div>
      
      {/* العدد الإجمالي */}
      <span className="text-sm font-medium mr-1">
        {totalReactions}
      </span>
    </button>
  );
}