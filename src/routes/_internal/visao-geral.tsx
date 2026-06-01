import { FeedbackCard } from '@/components/feedback-card';
import { H1 } from '@/components/h1';
import { H2 } from '@/components/h2';
import { KpiCard } from '@/components/kapi-card';
import { Ranking } from '@/components/ranking';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    useGetKpi,
    useGetMembersRanking,
    useGetReceivedsFeedback,
    type Feedback,
    type MembersRanking,
} from '@/hooks/useFeedback';
import { useMe } from '@/hooks/useMe';
import {
    getCategoryBorder,
    getCategoryColor,
    getCategoryIcon,
} from '@/lib/feedback-utils';
import { cn } from '@/lib/utils';

import { createFileRoute } from '@tanstack/react-router';
import { Bell, Crown, MessageSquareOff } from 'lucide-react';

export const Route = createFileRoute('/_internal/visao-geral')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useMe();
    const { data: feedbacks } = useGetReceivedsFeedback();
    const { data: kpi } = useGetKpi();

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 max-h-[calc(100vh-5.5rem)]">
            <div className="flex w-full">
                <div>
                    <H1>Ola, {data?.name}!</H1>
                    <p className="text-xl text-muted-foreground">
                        Explore suas atividades recentes
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
                            <KpiCard key={item.title} cardProps={item} />
                        ))}
                    </div>

                    {data?.id && (
                        <Ranking
                            className="row-span-4 col-span-1"
                            userId={data.id}
                        />
                    )}

                    <div className="col-span-2">
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
