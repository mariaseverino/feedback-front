import type { FeedbackType } from '@/hooks/useFeedback';

export const getCategoryColor = (category: FeedbackType) => {
    switch (category) {
        case 'ELOGIO':
            return 'bg-[#E2F9E7] text-[#1D711C] border-[#1D711C]';
        case 'SUGESTAO':
            return 'bg-[#FCF5DB] text-[#995E32] border-[#995E32]';
        case 'CRITICA':
            return 'bg-[#E5F3FE] text-[#2A65C1] border-[#2A65C1]';
    }
};

export const getCategoryIcon = (category: FeedbackType) => {
    switch (category) {
        case 'ELOGIO':
            return '👏';
        case 'SUGESTAO':
            return '💡';
        case 'CRITICA':
            return '💬';
    }
};
export const getCategoryBg = (category: FeedbackType) => {
    switch (category) {
        case 'ELOGIO':
            return 'bg-[#395917]';
        case 'SUGESTAO':
            return 'bg-[#592f17]';
        case 'CRITICA':
            return 'bg-[#172a59]';
    }
};
