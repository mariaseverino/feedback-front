import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { getUserIcon } from '@/lib/avatar-utils';
import { H3 } from './h3';
import type { OrganizationRaking } from '@/lib/api';

export function Ranking({
    userId,
    className,
    data,
}: {
    userId: string;
    className?: string;

    data: OrganizationRaking[];
}) {
    const podium = data.slice(0, 3);

    return (
        <div className={`${className} rounded-3xl p-6 shadow-sm bg-white`}>
            <div className="border-b pb-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <H3>Ranking</H3>

                        <p className="text-sm text-muted-foreground">
                            Colaboradores com mais feedbacks.
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="mb-6">
                <h3 className="text-2xl mb-3">Ranking</h3>

                <p className="text-sm text-muted-foreground">
                    Colaboradores com mais feedbacks.
                </p>
            </div> */}

            <div className="mb-6 flex items-end justify-center gap-3 pt-3">
                {podium[1] && (
                    <PodiumCard user={podium[1]} height="h-18" ranking={2} />
                )}

                {podium[0] && (
                    <PodiumCard
                        user={podium[0]}
                        height="h-24"
                        winner
                        ranking={1}
                    />
                )}

                {podium[2] && (
                    <PodiumCard user={podium[2]} height="h-14" ranking={3} />
                )}
            </div>

            <div className="space-y-2 border-t pt-4">
                {data.slice(3).map((member, index) => (
                    <div
                        key={member.userId}
                        className={cn(
                            'flex items-center justify-between rounded-xl px-3 py-2 transition',
                            member.userId === userId &&
                                'bg-primary/10 ring-2 ring-primary',
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background font-semibold">
                                {index + 1}
                            </div>

                            <Avatar className="size-8">
                                <AvatarImage src={getUserIcon('icon-user-1')} />
                                <AvatarFallback className="bg-background">
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
                            {member.total}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface PodiumCardProps {
    user: OrganizationRaking;
    height: string;
    winner?: boolean;
    ranking: number;
}

function PodiumCard({ user, height, winner, ranking }: PodiumCardProps) {
    return (
        <div className="flex flex-col items-center">
            {winner && <Crown className="mb-2 text-yellow-500" />}

            <Avatar className="mb-2 size-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>

            <span className="max-w-20 truncate text-sm font-medium">
                {user.name}
            </span>

            <div
                className={cn(
                    'mt-3 flex w-24 items-center justify-center rounded-t-2xl bg-primary text-white font-bold',
                    height,
                )}
            >
                #{ranking}
            </div>
            <span className="truncate text-xs font-medium mt-1.5">
                {user.total} feedbacks
            </span>
        </div>
    );
}
