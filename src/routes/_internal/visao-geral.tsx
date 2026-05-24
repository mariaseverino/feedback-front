import { FeedbackCard } from '@/components/feedback-card';
import { H1 } from '@/components/h1';
import { H2 } from '@/components/h2';
import { KpiCard } from '@/components/kapi-card';
import { Ranking } from '@/components/ranking';
import { useGetKpi, useGetReceivedsFeedback } from '@/hooks/useFeedback';
import { useMe } from '@/hooks/useMe';

import { createFileRoute } from '@tanstack/react-router';
import { Bell } from 'lucide-react';

export const Route = createFileRoute('/_internal/visao-geral')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useMe();
    const { data: feedbacks } = useGetReceivedsFeedback();
    const { data: kpi } = useGetKpi();

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between w-full mb-8">
                <div>
                    <H1>Ola, {data?.name}!</H1>
                    <p className="text-xl">Explore suas atividades recentes</p>
                </div>
                <div className="size-15 rounded-full flex items-center justify-center bg-white">
                    <Bell />
                </div>
            </div>
            <section className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-5">
                    {kpi.map((item) => (
                        <KpiCard key={item.title} cardProps={item} />
                    ))}
                    {data?.id && (
                        <Ranking className="row-span-3" userId={data.id} />
                    )}

                    <div className="row-span-4 col-span-2">
                        <H2>Últimos feedbacks recebidos</H2>

                        <div className="grid grid-cols-2 gap-5">
                            {feedbacks.slice(0, 4).map((item) => (
                                <FeedbackCard feedback={item} key={item.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
