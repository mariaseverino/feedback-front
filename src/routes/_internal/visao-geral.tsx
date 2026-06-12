import { FeedbackCard } from '@/components/feedback-card';
import { H1 } from '@/components/h1';
import { H2 } from '@/components/h2';
import { KpiCard } from '@/components/kapi-card';
import { Ranking } from '@/components/ranking';
import { useGetMyPositionInRanking, useGetRanking } from '@/hooks/organization';
import { useGetKpi, useGetReceivedsFeedback } from '@/hooks/useFeedback';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_internal/visao-geral')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: feedbacks } = useGetReceivedsFeedback();

    // console.log(feedbacks);
    const { data: kpi = [] } = useGetKpi();

    const { data: myPosition } = useGetMyPositionInRanking();

    const { data: ranking = [] } = useGetRanking();

    const { user } = Route.useRouteContext();

    console.log(myPosition);

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 max-h-[calc(100vh-5.5rem)]">
            <div className="flex w-full">
                <div>
                    <H1>Olá, {user.name} 👋</H1>
                    {/* <H1>Ola, {user.name}!</H1> */}
                    <p className="text-xl text-muted-foreground">
                        Acompanhe seus feedbacks, desempenho e posição no
                        ranking da equipe.
                    </p>
                </div>
                {/* <div className="size-15 rounded-full flex items-center justify-center bg-white">
                    <Bell />
                </div> */}
            </div>
            <section className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2 grid grid-cols-3 gap-5">
                        {kpi.map((item) => (
                            <KpiCard
                                key={item.title}
                                currentValue={item.currentValue}
                                lastValue={item.lastValue}
                                title={item.title}
                                type={item.type}
                            />
                        ))}
                        {myPosition && (
                            <KpiCard
                                key={myPosition.currentMonthPosition?.rank}
                                currentValue={
                                    myPosition.currentMonthPosition.rank
                                }
                                lastValue={myPosition.lastMonthPosition?.rank}
                                title="Meu Ranking"
                                type="rank"
                            />
                        )}
                    </div>

                    {ranking && (
                        <Ranking
                            className="row-span-4 col-span-1"
                            userId={user.id}
                            data={ranking}
                        />
                    )}

                    <div className="col-span-2">
                        <H2>Últimos feedbacks recebidos</H2>

                        {feedbacks && (
                            <div className="grid grid-cols-2 gap-5">
                                {feedbacks.slice(0, 4).map((item) => (
                                    <FeedbackCard
                                        feedback={item}
                                        key={item.id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
