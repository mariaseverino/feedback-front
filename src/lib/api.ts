import axios, { AxiosError } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface User {
    id: string;
    email: string;
    name: string;
}

export async function getMe(): Promise<User> {
    try {
        const response = await api.get(`/me`, {
            withCredentials: true,
        });
        console.log(response.data.user);
        // console.log(response.data.data);
        return response.data.user;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
