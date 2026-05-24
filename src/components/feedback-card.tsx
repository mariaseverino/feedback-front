import type { Feedback } from '@/hooks/useFeedback';
import {
    getCategoryBg,
    getCategoryColor,
    getCategoryIcon,
} from '@/lib/feedback-utils';

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <div
            className={`${getCategoryBg(feedback.type)} rounded-4xl flex flex-col overflow-hidden`}
        >
            <div className="flex items-center justify-between px-5 py-4">
                <div className="text-white font-bold">
                    {feedback.anonymous ? 'Anonimo' : `${feedback.sender}`}
                </div>
                <div
                    className={`${getCategoryColor(feedback.type)} py-0.5 px-2 rounded-md`}
                >
                    {getCategoryIcon(feedback.type)}
                    {feedback.type}
                </div>
            </div>
            <div className="bg-white rounded-t-3xl p-5 flex flex-col gap-4">
                <div>{feedback.content}</div>
                <div className="text-muted-foreground text-base">
                    {new Intl.DateTimeFormat('pt-BR').format(
                        feedback.createdAt,
                    )}
                </div>
            </div>
        </div>
    );
}
