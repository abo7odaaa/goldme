import { useState } from 'react';

export interface Reaction {
  [key: string]: number;
}

export const useReactions = (initialReactions: Reaction = {}, userReaction?: string) => {
  const [reactions, setReactions] = useState<Reaction>(initialReactions);
  const [currentUserReaction, setCurrentUserReaction] = useState<string | undefined>(userReaction);

  const addReaction = (reactionName: string) => {
    setReactions(prev => {
      const newReactions = { ...prev };
      
      // إزالة التفاعل السابق للمستخدم إن وجد
      if (currentUserReaction && newReactions[currentUserReaction]) {
        newReactions[currentUserReaction] = Math.max(0, newReactions[currentUserReaction] - 1);
        if (newReactions[currentUserReaction] === 0) {
          delete newReactions[currentUserReaction];
        }
      }
      
      // إضافة التفاعل الجديد
      if (currentUserReaction !== reactionName) {
        newReactions[reactionName] = (newReactions[reactionName] || 0) + 1;
        setCurrentUserReaction(reactionName);
      } else {
        setCurrentUserReaction(undefined);
      }
      
      return newReactions;
    });
  };

  const removeReaction = () => {
    if (currentUserReaction) {
      setReactions(prev => {
        const newReactions = { ...prev };
        if (newReactions[currentUserReaction]) {
          newReactions[currentUserReaction] = Math.max(0, newReactions[currentUserReaction] - 1);
          if (newReactions[currentUserReaction] === 0) {
            delete newReactions[currentUserReaction];
          }
        }
        return newReactions;
      });
      setCurrentUserReaction(undefined);
    }
  };

  const getTotalReactions = () => {
    return Object.values(reactions).reduce((sum, count) => sum + count, 0);
  };

  return {
    reactions,
    currentUserReaction,
    addReaction,
    removeReaction,
    getTotalReactions
  };
};