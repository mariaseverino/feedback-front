import { H1 } from '@/components/h1';
import { H2 } from '@/components/h2';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    useGetKpi,
    useGetMembersRanking,
    useGetReceivedsFeedback,
    type Feedback,
    type Kpi,
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

export const Route = createFileRoute('/_internal/overview')({
    component: RouteComponent,
});

// function RouteComponent() {
//     const { data } = useMe();
//     const { data: feedbacks } = useGetReceivedsFeedback();
//     const { data: kpi } = useGetKpi();

//     return (
//         <div className="flex flex-col w-full">
//             <div className="flex justify-between w-full mb-8">
//                 <div>
//                     <H1>Ola, {data?.name}!</H1>
//                     <p className="text-xl">Explore suas atividades recentes</p>
//                 </div>
//                 <div className="size-15 rounded-full flex items-center justify-center bg-white">
//                     <Bell />
//                 </div>
//             </div>
//             <section className="flex flex-col gap-3">
//                 <div className="grid grid-cols-3 gap-5">
//                     {kpi.map((item) => (
//                         <KpiCard key={item.title} cardProps={item} />
//                     ))}
//                     {data?.id && (
//                         <Ranking className="row-span-3" userId={data.id} />
//                     )}

//                     <div className="row-span-4 col-span-2">
//                         <H2>Últimos feedbacks recebidos</H2>

//                         <div className="grid grid-cols-2 gap-5">
//                             {feedbacks.slice(0, 4).map((item) => (
//                                 <FeedbackCard feedback={item} key={item.id} />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export function KpiCard({ cardProps }: { cardProps: Kpi }) {
//     return (
//         <div className="bg-white rounded-3xl p-7 flex flex-col gap-5 ">
//             <div>
//                 <div className="text-xl">{cardProps.title}</div>
//             </div>
//             <div className="text-4xl flex gap-5 items-center">
//                 {cardProps.value}
//             </div>
//         </div>
//     );
// }

// export function Ranking({
//     className,
//     userId,
// }: {
//     className: string;
//     userId: string;
// }) {
//     const { data } = useGetMembersRanking();

//     const getPositionRanking = (ranking: number) => {
//         switch (ranking) {
//             case 1:
//                 return 'left-1/2 -translate-x-1/2';
//             case 2:
//                 return 'left-0 top-12';
//             case 3:
//                 return 'right-0 top-12';
//         }
//     };

//     return (
//         <div
//             className={`${className} rounded-3xl py-7 px-3.5 bg-white overflow-y-auto`}
//         >
//             <div className="relative h-40">
//                 {data.slice(0, 3).map((item) => (
//                     <div
//                         key={item.ranking}
//                         className={`absolute flex flex-col items-center ${getPositionRanking(item.ranking)}`}
//                     >
//                         {item.ranking === 1 ? (
//                             <Crown className="text-yellow-500" />
//                         ) : (
//                             ''
//                         )}

//                         <Avatar className="size-12 rounded-full">
//                             <AvatarImage
//                                 src="https://github.com/shadcn.png"
//                                 alt=""
//                             />
//                             <AvatarFallback className="rounded-full">
//                                 CN
//                             </AvatarFallback>
//                         </Avatar>
//                         <div className="font-bold">{item.name}</div>
//                         <div className="text-muted-foreground">
//                             {item.feedbacks} feedbacks
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="bg-primary w-full h-0.5" />

//             <div>
//                 {data.slice(3, 10).map((item) => (
//                     <div
//                         key={item.ranking}
//                         className={`flex items-center justify-between py-2 px-3.5 ${item.userId === userId ? 'bg-primary/50 rounded-md font-bold' : ''}`}
//                     >
//                         <div className="flex gap-4 items-center">
//                             <div className="size-8 bg-background flex items-center justify-center rounded-md mr-1">
//                                 {item.ranking}
//                             </div>
//                             <Avatar className="size-8 rounded-full">
//                                 <AvatarImage
//                                     src="https://github.com/shadcn.png"
//                                     alt=""
//                                 />
//                                 <AvatarFallback className="rounded-full">
//                                     CN
//                                 </AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 {item.userId === userId
//                                     ? 'Voce'
//                                     : `${item.name}`}
//                             </div>
//                         </div>

//                         <div>{item.feedbacks} feedbacks</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export function FeedbackCard({ feedback }: { feedback: Feedback }) {
//     return (
//         <div
//             className={`bg-white rounded-t-3xl flex flex-col border-l-4 py-5 ${getCategoryBorder(feedback.type)}`}
//         >
//             <div className="flex items-center justify-between px-5 mb-3">
//                 <div className="text-muted-foreground font-bold">
//                     De:{' '}
//                     <span className="text-foreground">
//                         {feedback.anonymous ? 'Anonimo' : `${feedback.sender}`}
//                     </span>
//                 </div>
//                 <div
//                     className={`${getCategoryColor(feedback.type)} py-0.5 px-2 rounded-md`}
//                 >
//                     {getCategoryIcon(feedback.type)}
//                     {feedback.type}
//                 </div>
//             </div>
//             <div className="px-5 flex flex-col gap-4 justify-between h-full">
//                 <div>{feedback.content}</div>
//                 <div className="text-muted-foreground text-base">
//                     {new Intl.DateTimeFormat('pt-BR').format(
//                         feedback.createdAt,
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

function RouteComponent() {
    const { data: user } = useMe();
    const { data: feedbacks = [] } = useGetReceivedsFeedback();
    const { data: kpi = [] } = useGetKpi();

    const firstName = user?.name?.split(' ')[0];

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="space-y-8 p-6">
                <header className="flex items-start justify-between">
                    <div>
                        <H1>Olá, {firstName} 👋</H1>

                        <p className="text-muted-foreground mt-2">
                            Acompanhe seus feedbacks, desempenho e posição no
                            ranking da equipe.
                        </p>
                    </div>

                    <button className="relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-background shadow-sm transition hover:shadow-md">
                        <Bell className="size-5" />

                        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
                    </button>
                </header>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {kpi.map((item) => (
                        <KpiCard key={item.title} cardProps={item} />
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <H2>Últimos feedbacks recebidos</H2>

                            <span className="text-sm text-muted-foreground">
                                {feedbacks.length} feedbacks
                            </span>
                        </div>

                        {feedbacks.length === 0 ? (
                            <EmptyFeedbackState />
                        ) : (
                            <div className="grid gap-4 xl:grid-cols-2">
                                {feedbacks.slice(0, 4).map((feedback) => (
                                    <FeedbackCard
                                        key={feedback.id}
                                        feedback={feedback}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {user?.id && <Ranking userId={user.id} className="" />}
                    <Ranking userId={user.id} className="" />
                </section>
            </div>
        </div>
    );
}

import { ArrowUpRight, MessageSquare } from 'lucide-react';

export function KpiCard({ cardProps }: { cardProps: Kpi }) {
    return (
        <div
            className="
            rounded-3xl
            border
            bg-background
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
        "
        >
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

export function Ranking({ userId }: { userId: string; className?: string }) {
    const { data = [] } = useGetMembersRanking();

    const podium = data.slice(0, 3);

    return (
        <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="mb-6">
                <H2>Ranking</H2>

                <p className="text-sm text-muted-foreground">
                    Colaboradores com mais feedbacks.
                </p>
            </div>

            <div className="mb-8 flex items-end justify-center gap-3">
                {podium[1] && <PodiumCard user={podium[1]} height="h-24" />}

                {podium[0] && (
                    <PodiumCard user={podium[0]} height="h-32" winner />
                )}

                {podium[2] && <PodiumCard user={podium[2]} height="h-20" />}
            </div>

            <div className="space-y-2 border-t pt-4">
                {data.slice(3).map((member) => (
                    <div
                        key={member.ranking}
                        className={cn(
                            'flex items-center justify-between rounded-xl px-3 py-2 transition',
                            member.userId === userId &&
                                'bg-primary/10 ring-2 ring-primary',
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-semibold">
                                {member.ranking}
                            </div>

                            <Avatar className="size-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    {member.name
                                        .split(' ')
                                        .slice(0, 2)
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>

                            <span>
                                {member.userId === userId
                                    ? 'Você'
                                    : member.name}
                            </span>
                        </div>

                        <span className="text-sm text-muted-foreground">
                            {member.feedbacks}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PodiumCard({
    user,
    height,
    winner,
}: {
    user: MembersRanking;
    height: string;
    winner?: boolean;
}) {
    return (
        <div className="flex flex-col items-center">
            {winner && <Crown className="mb-2 text-yellow-500" />}

            <Avatar className="mb-2 size-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>

            <span className="max-w-[80px] truncate text-sm font-medium">
                {user.name}
            </span>

            <div
                className={cn(
                    'mt-3 flex w-24 items-center justify-center rounded-t-2xl bg-primary text-white font-bold',
                    height,
                )}
            >
                #{user.ranking}
            </div>
        </div>
    );
}

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <div
            className={cn(
                'flex flex-col rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                getCategoryBorder(feedback.type),
            )}
        >
            <div className="flex items-center justify-between border-b px-5 py-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>
                            {feedback.anonymous ? '?' : feedback.sender?.[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="font-medium">
                            {feedback.anonymous ? 'Anônimo' : feedback.sender}
                        </div>

                        <div className="text-xs text-muted-foreground">
                            {/* {formatDistanceToNow(feedback.createdAt, {
                                locale: ptBR,
                                addSuffix: true,
                            })} */}
                            21;21
                        </div>
                    </div>
                </div>

                <Badge className={getCategoryColor(feedback.type)}>
                    {getCategoryIcon(feedback.type)}
                    <span className="ml-1">{feedback.type}</span>
                </Badge>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
                <p className="line-clamp-4 text-sm leading-7">
                    {feedback.content}
                </p>

                <div className="mt-5 text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    }).format(feedback.createdAt)}
                </div>
            </div>
        </div>
    );
}

function EmptyFeedbackState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed bg-background py-20 text-center">
            <MessageSquareOff className="mb-4 size-10 text-muted-foreground" />

            <h3 className="font-semibold">Nenhum feedback recebido</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Compartilhe seu perfil com a equipe para começar a receber
                feedbacks e acompanhar sua evolução.
            </p>
        </div>
    );
}
