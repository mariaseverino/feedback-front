import axios, { AxiosError } from 'axios';
import { auth } from './auth.client';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface User {
    id: string;
    email: string;
    name: string;
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
        console.log(response);
        console.log(response.data.user);
        // console.log(response.data.data);
        return response.data.user;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function getMembers(): Promise<Member[] | []> {
    console.log('teste');
    try {
        const { data: organizations } = await auth.organization.list();
        console.log(organizations![0].id);

        if (organizations) {
            console.log(organizations);
            const { data, error } = await auth.organization.listMembers({
                query: {
                    organizationId: organizations[0].id,
                    // limit: 100,
                    // offset: 0,
                    // sortBy: 'createdAt',
                    // sortDirection: 'desc',
                    // filterField: 'createdAt',
                    // filterOperator: 'eq',
                    // filterValue: 'value',
                },
            });
            console.log(data);
            console.log(data?.members);
            // console.log(response.data.data);
            return data?.members ?? [];
        }

        console.log(organizations);

        return [];
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
