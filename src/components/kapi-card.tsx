import type { Kpi } from '@/hooks/useFeedback';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

// export function KpiCard({ cardProps }: { cardProps: Kpi }) {
//     return (
//         <div className="bg-white rounded-3xl p-7 flex flex-col gap-5 ">
//             <div>
//                 <div className="text-xl">{cardProps.title}</div>
//             </div>
//             <div className="text-4xl flex gap-5 items-center">
//                 {cardProps.value}
//                 {/* TODO: trending */}
//                 {/* <div className="text-[#596269] text-base flex items-center mt-2">
//                     <TrendingBadge trending={cardProps.trending} />
//                     em compracao com o mes passado
//                 </div> */}
//             </div>
//         </div>
//     );
// }

export function KpiCard({ cardProps }: { cardProps: Kpi }) {
    return (
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {cardProps.title}
                    </p>

                    <h3 className="mt-3 text-4xl font-bold tracking-tight">
                        {cardProps.value}
                    </h3>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                    <MessageSquare className="size-5 text-primary" />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <ArrowUpRight className="size-4" />
                Crescimento contínuo
            </div>
        </div>
    );
}

// TODO: trending;
// function TrendingBadge({ trending }: { trending: number }) {
//     return trending > 0 ? (
//         <div
//             className={`py-0.5 px-1 rounded-xl bg-[#405F1F]/10 text-primary mr-2 flex items-center gap-1 text-sm`}
//         >
//             <TrendingUp size={12} /> {trending}%
//         </div>
//     ) : (
//         <div
//             className={`py-0.5 px-1 rounded-xl bg-[#FC6767]/10 text-[#98140B] mr-2 flex items-center gap-1 text-sm`}
//         >
//             <TrendingDown size={12} /> {trending}%
//         </div>
//     );
// }
