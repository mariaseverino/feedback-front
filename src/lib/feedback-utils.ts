import type { FeedbackType } from '@/hooks/useFeedback';

export const getCategoryColor = (category: FeedbackType) => {
    switch (category) {
        case 'Positivo':
            return 'bg-[#E2F9E7] text-[#1D711C] border-[#1D711C]';
        case 'Construtivo':
            return 'bg-[#FCF5DB] text-[#995E32] border-[#995E32]';
        case 'Geral':
            return 'bg-[#E5F3FE] text-[#2A65C1] border-[#2A65C1]';
    }
};

export const getCategoryIcon = (category: FeedbackType) => {
    switch (category) {
        case 'Positivo':
            return '👏';
        case 'Construtivo':
            return '💡';
        case 'Geral':
            return '💬';
    }
};
export const getCategoryBg = (category: FeedbackType) => {
    return 'bg-primary';
};

export const getCategoryBorder = (category: FeedbackType) => {
    switch (category) {
        case 'Positivo':
            return 'border-[#1D711C]';
        case 'Construtivo':
            return 'border-[#995E32]';
        case 'Geral':
            return 'border-[#2A65C1]';
    }
};
