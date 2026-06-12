import type { Kpi } from '@/hooks/useFeedback';
import {
    ArrowDownRight,
    ArrowUpRight,
    MessageSquare,
    Trophy,
} from 'lucide-react';

export function KpiCard({ currentValue, lastValue, title, type }: Kpi) {
    const dif =
        type === 'rank'
            ? (lastValue ?? currentValue) - currentValue
            : currentValue - (lastValue ?? 0);

    // console.log(currentValue, lastValue);
    // console.log(dif);

    const improve = dif > 0;

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>

                    <h3 className="mt-3 text-4xl font-bold tracking-tight flex">
                        {type === 'rank' ? (
                            <div className="text-2xl flex items-end mr-1">
                                #
                            </div>
                        ) : null}
                        {currentValue}
                    </h3>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                    {getKpiIcon(type)}
                </div>
            </div>

            <div
                className={`mt-4 flex items-center gap-1 text-sm ${
                    lastValue === undefined || dif === 0
                        ? 'text-gray-600'
                        : improve
                          ? 'text-green-600'
                          : 'text-red-600'
                }`}
            >
                {lastValue === undefined || dif === 0
                    ? ''
                    : getUpOrDownIcon(improve)}
                {type === 'rank' ? (
                    <>
                        {lastValue === undefined
                            ? 'Sem dados do mês passado'
                            : dif === 0
                              ? 'Manteve a posição'
                              : improve
                                ? `Subiu ${Math.abs(dif)} posições`
                                : `Caiu ${Math.abs(dif)} posições`}
                    </>
                ) : (
                    <>
                        {lastValue === undefined || dif === 0
                            ? 'Sem dados do mês passado'
                            : 'em relação ao mês anterior'}
                    </>
                )}
            </div>
        </div>
    );
}

const getKpiIcon = (iconType: string) => {
    switch (iconType) {
        case 'rank':
            return <Trophy className="size-5 text-primary" />;
        default:
            return <MessageSquare className="size-5 text-primary" />;
    }
};

const getUpOrDownIcon = (improve: boolean) => {
    switch (improve) {
        case true:
            return <ArrowUpRight className="size-4" />;
        default:
            return <ArrowDownRight className="size-4" />;
    }
};

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
