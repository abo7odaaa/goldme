import { iphoneEmojis } from "@/lib/emojis";

interface ReactionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (reactionName: string) => void;
  position: { x: number; y: number };
}

export function ReactionPicker({ isOpen, onClose, onSelect, position }: ReactionPickerProps) {
  if (!isOpen) return null;

  const handleSelect = (reactionName: string) => {
    onSelect(reactionName);
    onClose();
  };

  return (
    <>
      {/* خلفية شفافة للإغلاق */}
      <div 
        className="fixed inset-0 z-50 bg-black/20" 
        onClick={onClose}
      />
      
      {/* قائمة الإيموجي */}
      <div 
        className="fixed z-50 bg-background/95 backdrop-blur-md rounded-3xl shadow-2xl border border-border p-4 animate-scale-in"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '320px',
          width: '90vw'
        }}
      >
        <div className="grid grid-cols-5 gap-3">
          {iphoneEmojis.map((emoji) => (
            <button
              key={emoji.name}
              className="p-3 rounded-2xl hover:bg-secondary/50 transition-all duration-200 hover:scale-110 active:scale-95 text-2xl"
              onClick={() => handleSelect(emoji.name)}
              title={emoji.label}
            >
              {emoji.emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}