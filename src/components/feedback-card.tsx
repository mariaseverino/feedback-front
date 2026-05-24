import type { Feedback } from '@/hooks/useFeedback';
import {
    getCategoryBorder,
    getCategoryColor,
    getCategoryIcon,
} from '@/lib/feedback-utils';

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <div
            className={`bg-white rounded-t-3xl flex flex-col border-l-4 py-5 ${getCategoryBorder(feedback.type)}`}
        >
            {/* // <div
        //     className={`${getCategoryBg(feedback.type)} rounded-4xl flex flex-col overflow-hidden`}
        // > */}
            <div className="flex items-center justify-between px-5 mb-3">
                <div className="text-muted-foreground font-bold">
                    De:{' '}
                    <span className="text-foreground">
                        {feedback.anonymous ? 'Anonimo' : `${feedback.sender}`}
                    </span>
                </div>
                <div
                    className={`${getCategoryColor(feedback.type)} py-0.5 px-2 rounded-md`}
                >
                    {getCategoryIcon(feedback.type)}
                    {feedback.type}
                </div>
            </div>
            <div className="px-5 flex flex-col gap-4 justify-between h-full">
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

// TODO: versao anterior, talvez volte
// function FeedbackCard({ feedback }: { feedback: Feedback }) {
//     const getCategoryBorder = (category: FeedbackType) => {
//         switch (category) {
//             case 'ELOGIO':
//                 return 'border-l-4 border-[#1D711C]';
//             case 'SUGESTAO':
//                 return 'border-l-4 border-[#995E32]';
//             case 'CRITICA':
//                 return 'border-l-4 border-[#2A65C1]';
//         }
//     };
//     return (
//         <div
//             className={`bg-card shadow rounded-lg p-4 ${getCategoryBorder(feedback.type)}`}
//         >
//             <div className="flex justify-between mb-4">
//                 <div className="flex gap-2 text-[#6C63FF]">
//                     {feedback.anonymous ? (
//                         <Shield className="size-5" />
//                     ) : (
//                         <User className="size-5" />
//                     )}

//                     <label className="font-bold">
//                         De:{' '}
//                         <span className="text-foreground">
//                             {feedback.anonymous
//                                 ? 'Anonimo'
//                                 : `${feedback.sender}`}
//                         </span>
//                     </label>
//                     <div
//                         className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
//                             feedback.type,
//                         )}`}
//                     >
//                         {getCategoryIcon(feedback.type)} {feedback.type}
//                     </div>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                     <Clock className="size-3.5 text-(--paragraph)" />
//                     <label className="text-(--paragraph) text-sm">
//                         22/05/2013
//                     </label>
//                 </div>
//             </div>
//             <div className="flex rounded-md gap-3">
//                 <div>
//                     <MessageSquare className="size-5 mt-1 text-[#6C63FF]" />
//                 </div>
//                 <div className="text-muted-foreground">{feedback.content}</div>
//             </div>
//         </div>
//     );
// }
