import { SelectDemo } from '@/components/selectDemo';
import { Select } from '@/components/ui/select';
import { getMe, type User } from '@/lib/api';
import { auth } from '@/lib/auth.client';
import { useQuery } from '@tanstack/react-query';
import {
    createFileRoute,
    Link,
    Outlet,
    redirect,
    useLoaderData,
    useNavigate,
} from '@tanstack/react-router';

import { DoorOpen, MessagesSquare, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

// export const queryClient = new QueryClient();

export const Route = createFileRoute('/_internal')({
    component: InternalLayout,
    beforeLoad: async () => {
        try {
            const user = await getMe();

            if (!user) {
                throw redirect({ to: '/signIn' });
            }

            // const { data: user } = useQuery({
            //     queryKey: ['current_user'],
            //     queryFn: () => getMe(),
            // });

            return { user };
        } catch (error) {
            throw redirect({ to: '/signIn' });
        }
    },
});

export function InternalLayout() {
    const { user } = Route.useRouteContext();

    return (
        <div className="bg-linear-to-r from-[#9796f0] to-[#fbc7d4] max-h-screen flex flex-col h-screen py-5 gap-14">
            {/* <div className="bg-[#F8F8FF] min-h-screen flex flex-col"> */}
            <Header user={user} />

            <main className={`flex flex-1 max-w-7xl mx-auto h-full`}>
                <Outlet />
            </main>
        </div>
    );
}

export function Header({ user }: { user: User }) {
    const { data: organizations } = auth.useListOrganizations();

    return (
        <header className="text-(--title) pb-1 px-10 flex flex-col gap-8 relative">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <MessagesSquare className="size-8 text-[#6C63FF]" />
                    {organizations && (
                        <SelectDemo organizations={organizations} />
                    )}
                </div>
                <div className="flex gap-2">
                    {/* {getIcon('superHeroi1')} */}
                    {user.name}
                </div>
            </div>
            <nav className="z-50 flex gap-3">
                <Link
                    to="/overview"
                    className="[&.active]:bg-[#F8F8FF]/70 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Overview
                </Link>
                <Link
                    to="/"
                    className="[&.active]:bg-gray-200 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Equipe
                </Link>
                <Link
                    to="/"
                    className="[&.active]:bg-gray-200 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Feedbacks
                </Link>
                <Link
                    to="/"
                    className="[&.active]:bg-gray-200 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Plano & Pagamentos
                </Link>
            </nav>
        </header>
    );
}
