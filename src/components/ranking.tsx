import { useGetMembersRanking } from '@/hooks/useFeedback';
import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Ranking({
    className,
    userId,
}: {
    className: string;
    userId: string;
}) {
    const { data } = useGetMembersRanking();

    const getPositionRanking = (ranking: number) => {
        switch (ranking) {
            case 1:
                return 'left-1/2 -translate-x-1/2';
            case 2:
                return 'left-0 top-12';
            case 3:
                return 'right-0 top-12';
        }
    };

    return (
        <div
            className={`${className} rounded-[27px] py-7 px-3.5 bg-white overflow-y-auto`}
        >
            <div className="relative h-40">
                {data.slice(0, 3).map((item) => (
                    <div
                        key={item.ranking}
                        className={`absolute flex flex-col items-center ${getPositionRanking(item.ranking)}`}
                    >
                        {item.ranking === 1 ? (
                            <Crown className="text-yellow-500" />
                        ) : (
                            ''
                        )}

                        <Avatar className="size-12 rounded-full">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt=""
                            />
                            <AvatarFallback className="rounded-full">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-muted-foreground">
                            {item.feedbacks} feedbacks
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-primary w-full h-0.5" />

            <div>
                {data.slice(3, 10).map((item) => (
                    <div
                        key={item.ranking}
                        className={`flex items-center justify-between py-2 px-3.5 ${item.userId === userId ? 'bg-primary/50 rounded-md font-bold' : ''}`}
                    >
                        <div className="flex gap-4 items-center">
                            <div className="size-8 bg-background flex items-center justify-center rounded-md mr-1">
                                {item.ranking}
                            </div>
                            <Avatar className="size-8 rounded-full">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt=""
                                />
                                <AvatarFallback className="rounded-full">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                {item.userId === userId
                                    ? 'Voce'
                                    : `${item.name}`}
                            </div>
                        </div>

                        <div>{item.feedbacks} feedbacks</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
