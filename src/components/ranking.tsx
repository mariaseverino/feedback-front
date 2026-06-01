import { useGetMembersRanking, type MembersRanking } from '@/hooks/useFeedback';
import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { H2 } from './h2';
import { getUserIcon } from '@/lib/avatar-utils';
import { H3 } from './h3';

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

export function Ranking({
    userId,
    className,
}: {
    userId: string;
    className?: string;
}) {
    const { data = [] } = useGetMembersRanking();

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
                {podium[1] && <PodiumCard user={podium[1]} height="h-18" />}

                {podium[0] && (
                    <PodiumCard user={podium[0]} height="h-24" winner />
                )}

                {podium[2] && <PodiumCard user={podium[2]} height="h-14" />}
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
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background font-semibold">
                                {member.ranking}
                            </div>

                            <Avatar className="size-8">
                                <AvatarImage src={getUserIcon(member.iconId)} />
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

            <span className="max-w-20 truncate text-sm font-medium">
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
