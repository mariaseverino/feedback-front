import {
    getFeedbackKpi,
    getReceivedsFeedbacks,
    sendFeedback,
    type Member,
    type SendFeedbackDto,
} from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trophy } from 'lucide-react';

export type FeedbackType = 'O que está indo bem' | 'O que pode melhorar';

export interface Feedback {
    id: string;
    type: FeedbackType;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    sender?: string;
}

export function useGetReceivedsFeedback() {
    return useQuery({
        queryKey: ['feedbacks'],
        queryFn: getReceivedsFeedbacks,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
    // const feedbacksMock: Feedback[] = [
    //     {
    //         id: '1',
    //         type: 'ELOGIO',
    //         content:
    //             'Você sempre se mostra disponível para ajudar o time, isso faz muita diferença no dia a dia.',
    //         anonymous: false,
    //         sender: 'Ana Paula',
    //         createdAt: new Date('2026-05-30'),
    //     },
    //     {
    //         id: '2',
    //         type: 'SUGESTAO',
    //         content:
    //             'Acho que você poderia compartilhar mais o andamento das tarefas para alinhar melhor o time.',
    //         anonymous: true,
    //         createdAt: new Date('2026-02-06'),
    //     },
    //     {
    //         id: '3',
    //         type: 'CRITICA',
    //         content:
    //             'Em algumas reuniões, suas colocações acabam interrompendo outras pessoas.',
    //         anonymous: true,
    //         createdAt: new Date('2026-04-07'),
    //     },
    //     {
    //         id: '4',
    //         type: 'ELOGIO',
    //         content:
    //             'Sua organização ajuda muito quando precisamos retomar tarefas antigas.',
    //         anonymous: false,
    //         sender: 'Carlos Mendes',
    //         createdAt: new Date('2026-01-08'),
    //     },
    //     {
    //         id: '5',
    //         type: 'SUGESTAO',
    //         content: 'Talvez valha tentar delegar mais para evitar sobrecarga.',
    //         anonymous: false,
    //         sender: 'Juliana Rocha',
    //         createdAt: new Date('2026-01-09'),
    //     },
    //     {
    //         id: '6',
    //         type: 'CRITICA',
    //         content: 'Às vezes você demora a responder mensagens importantes.',
    //         anonymous: true,
    //         createdAt: new Date('2026-03-10'),
    //     },
    //     {
    //         id: '7',
    //         type: 'ELOGIO',
    //         content: 'Você tem uma comunicação muito clara e objetiva.',
    //         anonymous: false,
    //         sender: 'Rafael Alves',
    //         createdAt: new Date('2026-02-11'),
    //     },
    //     {
    //         id: '8',
    //         type: 'SUGESTAO',
    //         content:
    //             'Seria interessante envolver mais o time nas decisões iniciais.',
    //         anonymous: true,
    //         createdAt: new Date('2026-01-12'),
    //     },
    //     {
    //         id: '9',
    //         type: 'CRITICA',
    //         content:
    //             'Em alguns momentos, a postura parece um pouco defensiva diante de feedbacks.',
    //         anonymous: false,
    //         sender: 'Fernanda Lima',
    //         createdAt: new Date('2026-01-13'),
    //     },
    //     {
    //         id: '10',
    //         type: 'ELOGIO',
    //         content: 'Você lida muito bem com pressão e prazos curtos.',
    //         anonymous: true,
    //         createdAt: new Date('2026-01-14'),
    //     },
    //     {
    //         id: '11',
    //         type: 'SUGESTAO',
    //         content:
    //             'Talvez documentar melhor os processos ajude quem está chegando agora.',
    //         anonymous: false,
    //         sender: 'Lucas Ribeiro',
    //         createdAt: new Date('2026-01-15'),
    //     },
    //     {
    //         id: '12',
    //         type: 'CRITICA',
    //         content: 'Algumas entregas poderiam ter mais atenção aos detalhes.',
    //         anonymous: true,
    //         createdAt: new Date('2026-01-16'),
    //     },
    //     {
    //         id: '13',
    //         type: 'ELOGIO',
    //         content: 'Sua proatividade inspira outras pessoas do time.',
    //         anonymous: false,
    //         sender: 'Patrícia Gomes',
    //         createdAt: new Date('2026-01-17'),
    //     },
    //     {
    //         id: '14',
    //         type: 'SUGESTAO',
    //         content:
    //             'Tentar ouvir mais antes de propor soluções pode enriquecer as discussões.',
    //         anonymous: true,
    //         createdAt: new Date('2026-01-18'),
    //     },
    //     {
    //         id: '15',
    //         type: 'CRITICA',
    //         content:
    //             'Em alguns casos, o tom das mensagens pode soar mais ríspido do que o esperado.',
    //         anonymous: false,
    //         sender: 'Marcos Vinícius',
    //         createdAt: new Date('2026-01-19'),
    //     },
    // ];

    // return { data: feedbacksMock };
}

export function useSendFeedback() {
    return useMutation({
        mutationFn: async (data: SendFeedbackDto) => sendFeedback(data),
    });
}

export interface MembersRanking {
    userId: string;
    ranking: number;
    name: string;
    iconId: string;
    feedbacks: number;
}

export function useGetMembersRanking() {
    const members: MembersRanking[] = [
        {
            userId: 'usr_001',
            ranking: 1,
            name: 'João',
            iconId: 'icon-user-1',
            feedbacks: 320,
        },
        {
            userId: 'usr_002',
            ranking: 2,
            name: 'Maria',
            iconId: 'icon-user-2',
            feedbacks: 295,
        },
        {
            userId: 'usr_003',
            ranking: 3,
            name: 'Carlos',
            iconId: 'icon-user-3',
            feedbacks: 280,
        },
        {
            userId: 'usr_004',
            ranking: 4,
            name: 'Ana',
            iconId: 'icon-user-4',
            feedbacks: 250,
        },
        {
            userId: 'usr_005',
            ranking: 5,
            name: 'Pedro',
            iconId: 'icon-user-5',
            feedbacks: 230,
        },
        {
            userId: 'Comp',
            ranking: 6,
            name: 'Julia',
            iconId: 'icon-user-6',
            feedbacks: 210,
        },
        {
            userId: 'usr_007',
            ranking: 7,
            name: 'Fernanda',
            iconId: 'icon-user-7',
            feedbacks: 190,
        },
        {
            userId: 'usr_008',
            ranking: 8,
            name: 'Lucas',
            iconId: 'icon-user-8',
            feedbacks: 170,
        },
        {
            userId: 'usr_009',
            ranking: 9,
            name: 'Patrícia',
            iconId: 'icon-user-9',
            feedbacks: 150,
        },
        {
            userId: 'usr_010',
            ranking: 10,
            name: 'Rafael',
            iconId: 'icon-user-10',
            feedbacks: 130,
        },
    ];

    return { data: members };
}

export type Kpi = {
    title: string;
    currentValue: number;
    lastValue: number | undefined;
    type: 'trend' | 'rank';
};

export function useGetKpi() {
    const cards: Kpi[] = [
        {
            title: 'Feedbacks Recebidos',
            currentValue: 12,
            lastValue: 15,
            type: 'trend',
        },
        {
            title: 'Feedbacks Enviados',
            currentValue: 12,
            lastValue: 15,
            type: 'trend',
        },
        // {
        //     title: 'Seu Ranking',
        //     currentValue: 5,
        //     lastValue: 3,
        //     type: 'rank',
        // },
    ];

    return useQuery({
        queryKey: ['kpi'],
        queryFn: getFeedbackKpi,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });

    // return { data: cards };
}
