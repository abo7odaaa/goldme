// iPhone emoji reactions
export const iphoneEmojis = [
  { emoji: '👍', name: 'like', label: 'إعجاب' },
  { emoji: '❤️', name: 'love', label: 'حب' },
  { emoji: '😂', name: 'laugh', label: 'ضحك' },
  { emoji: '😮', name: 'wow', label: 'واو' },
  { emoji: '😢', name: 'sad', label: 'حزن' },
  { emoji: '😡', name: 'angry', label: 'غضب' },
  { emoji: '🔥', name: 'fire', label: 'نار' },
  { emoji: '💯', name: 'hundred', label: 'مائة' },
  { emoji: '🎉', name: 'party', label: 'احتفال' },
  { emoji: '💪', name: 'strong', label: 'قوة' },
  { emoji: '👏', name: 'clap', label: 'تصفيق' },
  { emoji: '🙏', name: 'pray', label: 'دعاء' },
  { emoji: '✨', name: 'sparkles', label: 'بريق' },
  { emoji: '🌟', name: 'star', label: 'نجمة' },
  { emoji: '💖', name: 'heart', label: 'قلب' },
  { emoji: '😍', name: 'heart_eyes', label: 'عيون قلب' },
  { emoji: '🤩', name: 'star_struck', label: 'منبهر' },
  { emoji: '😘', name: 'kiss', label: 'قبلة' },
  { emoji: '🥰', name: 'loving', label: 'محب' },
  { emoji: '😎', name: 'cool', label: 'رائع' }
];

export const getEmojiByName = (name: string) => {
  return iphoneEmojis.find(emoji => emoji.name === name);
};

export const getTopReactions = (reactions: Record<string, number>) => {
  return Object.entries(reactions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([name, count]) => ({
      emoji: getEmojiByName(name)?.emoji || '👍',
      name,
      count
    }));
};