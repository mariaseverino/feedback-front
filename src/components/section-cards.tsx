import { TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface KpiData {
    id: string; // Identificador único
    titulo: string;
    valor: string | number;
    unidade?: string; // Ex: '%', 'feedbacks'
    descricao?: string; // Breve descrição ou tendência
}

export function SectionCards({ data }: { data: KpiData }) {
    const isPositiveTrend =
        data.id === 'total-mes' || data.id === 'media-semana';
    const trendColor = isPositiveTrend
        ? 'text-green-500 bg-green-200'
        : 'text-red-500 bg-red-200';
    return (
        <Card className="@container/card backdrop-blur-lg border border-[#F8F8FF]/70 shadow-2xl bg-linear-to-br from-[#F8F8FF]/70 to-[#F8F8FF]/5 rounded-lg">
            <CardHeader>
                <CardDescription>{data.titulo}</CardDescription>
                <div className="mt-2 flex items-baseline">
                    <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        {data.valor}
                    </p>
                    <span className="ml-2 text-lg font-semibold text-gray-500 dark:text-gray-400">
                        {data.unidade}
                    </span>
                </div>
                <CardAction>
                    <Badge variant="default" className={`${trendColor}`}>
                        <TrendingUp />
                        +12.5%
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <p className=" text-xs text-gray-800 dark:text-gray-400 italic">
                    {data.descricao}
                </p>
            </CardFooter>
        </Card>
    );
}
