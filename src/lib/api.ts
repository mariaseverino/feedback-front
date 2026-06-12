import axios, { AxiosError } from 'axios';
import { auth } from './auth.client';
import type { FeedbackType, Kpi } from '@/hooks/useFeedback';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: 'member' | 'owner';
    activeOrganizationId: string;
    organizationName: string;
}

export interface Feedback {
    id: string;
    type: FeedbackType;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    sender?: string;
}

export interface SendFeedbackDto {
    category: string;
    feedback: string;
    receiverId: string;
    anonymous: boolean;
}

export interface Member {
    userId: string;
    role: 'member' | 'admin' | 'owner';
    user: User;
}

export async function getMe(): Promise<User> {
    try {
        const response = await api.get(`/me`, {
            withCredentials: true,
        });

        return response.data.user;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

// export async function getMembers(): Promise<Member[] | []> {
//     console.log('teste');
//     try {
//         const { data: organizations } = await auth.organization.list();
//         console.log(organizations![0].id);

//         if (organizations) {
//             console.log(organizations);
//             const { data, error } = await auth.organization.listMembers({
//                 query: {
//                     organizationId: organizations[0].id,
//                     // limit: 100,
//                     // offset: 0,
//                     // sortBy: 'createdAt',
//                     // sortDirection: 'desc',
//                     // filterField: 'createdAt',
//                     // filterOperator: 'eq',
//                     // filterValue: 'value',
//                 },
//             });
//             console.log(data);
//             console.log(data?.members);
//             // console.log(response.data.data);
//             return data?.members ?? [];
//         }

//         console.log(organizations);

//         return [];
//     } catch (err) {
//         const error = err as AxiosError<{ message?: string }>;
//         throw error;
//     }
// }

export async function sendFeedback(data: SendFeedbackDto) {
    try {
        await api.post<SendFeedbackDto>('/feedback', data, {
            withCredentials: true,
        });
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function getReceivedsFeedbacks() {
    try {
        const response = await api.get<Feedback[]>('/feedbacks', {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export interface OrganizationRaking {
    userId: string | null;
    name: string;
    total: number;
}

interface MyPosition {
    currentMonthPosition: {
        rank: number;
        total: number;
    };
    lastMonthPosition: {
        rank: number | undefined;
        total: number;
    };
}

export async function getRanking() {
    try {
        const response = await api.get<OrganizationRaking[]>('/ranking', {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function getMyPosition(): Promise<MyPosition> {
    try {
        const response = await api.get('/ranking/my-position', {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function getFeedbackKpi(): Promise<Kpi[]> {
    try {
        const response = await api.get('/feedbacks/kpi', {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
