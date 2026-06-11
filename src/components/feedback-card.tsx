import type { Feedback } from '@/hooks/useFeedback';
import {
    getCategoryBorder,
    getCategoryColor,
    getCategoryIcon,
} from '@/lib/feedback-utils';
import { Badge } from './ui/badge';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <div
            className={`bg-white rounded-3xl flex flex-col border py-5 shadow-sm ${getCategoryBorder(feedback.type)}`}
        >
            <div className="flex items-center justify-between px-5 mb-3">
                <div className="font-medium text-muted-foreground">
                    {feedback.isAnonymous ? 'Anônimo' : feedback.sender}
                </div>
                <Badge className={getCategoryColor(feedback.type)}>
                    {getCategoryIcon(feedback.type)}
                    <span className="ml-1">{feedback.type}</span>
                </Badge>
            </div>
            <div className="px-5 flex flex-col gap-4 justify-between h-full">
                <div>{feedback.content}</div>
                <div className="text-muted-foreground text-sm">
                    {formatDistance(new Date(feedback.createdAt), new Date(), {
                        addSuffix: true,
                        locale: ptBR,
                    })}
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
//                     {feedback.isAnonymous ? (
//                         <Shield className="size-5" />
//                     ) : (
//                         <User className="size-5" />
//                     )}

//                     <label className="font-bold">
//                         De:{' '}
//                         <span className="text-foreground">
//                             {feedback.isAnonymous
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

// import type { Feedback } from '@/hooks/useFeedback';
// import {
//     getCategoryBorder,
//     getCategoryColor,
//     getCategoryIcon,
// } from '@/lib/feedback-utils';

// export function FeedbackCard({ feedback }: { feedback: Feedback }) {
//     return (
//         <div
//             className={`
//                 bg-card
//                 rounded-2xl
//                 border-l-4
//                 min-h-[220px]
//                 flex
//                 flex-col
//                 shadow-sm
//                 transition-all
//                 hover:shadow-md
//                 hover:-translate-y-1
//                 ${getCategoryBorder(feedback.type)}
//             `}
//         >
//             <div className="flex items-center justify-between px-5 pt-5">
//                 <div className="flex flex-col">
//                     <span className="text-xs text-muted-foreground">
//                         Remetente
//                     </span>

//                     <span className="font-semibold">
//                         {feedback.isAnonymous ? 'Anônimo' : feedback.sender}
//                     </span>
//                 </div>

//                 <div
//                     className={`
//                         flex
//                         items-center
//                         gap-1
//                         rounded-full
//                         px-3
//                         py-1
//                         text-xs
//                         font-medium
//                         ${getCategoryColor(feedback.type)}
//                     `}
//                 >
//                     {getCategoryIcon(feedback.type)}
//                     {feedback.type}
//                 </div>
//             </div>

//             <div className="flex flex-col flex-1 px-5 py-4">
//                 <p className="flex-1 text-sm leading-relaxed line-clamp-5">
//                     {feedback.content}
//                 </p>

//                 <div className="pt-4 text-sm text-muted-foreground">
//                     {new Intl.DateTimeFormat('pt-BR', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                     }).format(new Date(feedback.createdAt))}
//                 </div>
//             </div>
//         </div>
//     );
// }
