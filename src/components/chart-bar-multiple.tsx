import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { VolumeFeedbackMensal } from '@/routes/_internal/overview';

export const description = 'A multiple bar chart';

const chartConfig = {
    anonimos: {
        label: 'Anonimos',
        color: 'var(--chart-1)',
    },
    identificados: {
        label: 'Identificados',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export function ChartBarMultiple({
    chartData,
}: {
    chartData: VolumeFeedbackMensal[];
}) {
    return (
        <Card className="h-full pb-1.5 backdrop-blur-none border-0 shadow bg-card/10 rounded-lg">
            <CardHeader>
                <CardTitle>Volume Mensal de Feedbacks</CardTitle>
                <CardDescription className="text-gray-700 dark:text-white">
                    Anônimos vs Identificados — Jul a Dez de 2025
                </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-full w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="anonimos" fill="#6C63FF" radius={4} />
                        <Bar
                            dataKey="identificados"
                            fill="#A4F5A6"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
