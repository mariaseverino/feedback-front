import type { FeedbackType } from '@/hooks/useFeedback';
import { FeedbackCategory } from '@/routes/_internal/feedbacks';

export const getCategoryColor = (category: FeedbackType) => {
    switch (category) {
        case 'O que está indo bem':
            return 'bg-[#E2F9E7] text-[#1D711C] border-[#1D711C]';
        case 'O que pode melhorar':
            return 'bg-[#FCF5DB] text-[#995E32] border-[#995E32]';
        // case 'Geral':
        //     return 'bg-[#E5F3FE] text-[#2A65C1] border-[#2A65C1]';
    }
};

export const getCategoryIcon = (category: FeedbackType) => {
    switch (category) {
        case 'O que está indo bem':
            return '👏';
        case 'O que pode melhorar':
            return '💡';
        // case 'Geral':
        //     return '💬';
    }
};
export const getCategoryBg = (category: FeedbackType) => {
    return 'bg-primary';
};

export const getCategoryBorder = (category: FeedbackType) => {
    switch (category) {
        case 'O que está indo bem':
            return 'border-[#1D711C]';
        case 'O que pode melhorar':
            return 'border-[#995E32]';
        // case 'Geral':
        //     return 'border-[#2A65C1]';
    }
};

export const CATEGORY_CONFIG = {
    [FeedbackCategory.GOING_WELL]: {
        badge: 'bg-[#E2F9E7] text-[#1D711C] border-[#1D711C]',
        border: 'border-[#1D711C]',
        icon: '👏',
    },
    [FeedbackCategory.CAN_IMPROVE]: {
        badge: 'bg-[#FCF5DB] text-[#995E32] border-[#995E32]',
        border: 'border-[#995E32]',
        icon: '💡',
    },
} as const;

// Uma função só, pega o que precisar
export const getCategoryConfig = (category: FeedbackType) =>
    CATEGORY_CONFIG[category];
