import { SelectDemo } from '@/components/selectDemo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getMe, type User } from '@/lib/api';
import { auth } from '@/lib/auth.client';
import {
    createFileRoute,
    Link,
    Outlet,
    redirect,
    useNavigate,
} from '@tanstack/react-router';

import { LogOut, MessagesSquare } from 'lucide-react';

export const Route = createFileRoute('/_internal')({
    component: InternalLayout,
    beforeLoad: async () => {
        try {
            const user = await getMe();

            if (!user) {
                throw redirect({ to: '/signIn' });
            }

            return { user };
        } catch (error) {
            throw redirect({ to: '/signIn' });
        }
    },
});

export function InternalLayout() {
    const { user } = Route.useRouteContext();

    return (
        <div className="bg-linear-to-r from-[#9796f0] to-[#fbc7d4] max-h-screen flex flex-col h-screen py-5 gap-14 dark:bg-linear-to-r dark:from-gray-900 dark:to-gray-900">
            <Header user={user} />

            <main className={`flex flex-1 w-7xl mx-auto h-full`}>
                <Outlet />
            </main>
        </div>
    );
}

export function Header({ user }: { user: User }) {
    const navigate = useNavigate();

    const { data: organizations } = auth.useListOrganizations();

    async function handleLogOut() {
        await auth.signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate({ to: '/signIn' });
                },
            },
        });
    }

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
                    <div
                        // size="lg"
                        className="flex bg-gray-50/20 px-3 py-2 rounded-xl gap-2 items-center"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt={user.name}
                            />
                            <AvatarFallback className="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user.name}
                            </span>
                            <span className="truncate text-xs">
                                {user.email}
                            </span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="bg-gray-400"
                        />
                        <button onClick={handleLogOut}>
                            <LogOut className="ml-auto size-4 hover:text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
            <nav className="z-50 flex gap-2">
                <Link
                    to="/overview"
                    className="[&.active]:bg-[#F8F8FF]/70 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Overview
                </Link>
                <Link
                    to="/members"
                    className="[&.active]:bg-gray-200 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Equipe
                </Link>
                <Link
                    to="/feedbacks"
                    className="[&.active]:bg-gray-200 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Feedbacks
                </Link>
                <Link
                    to="/settings"
                    className="[&.active]:bg-gray-200 [&.active]:text-[#6C63FF] [&.active]:font-medium px-3 py-0.5 rounded-md"
                >
                    Configurações
                </Link>
            </nav>
        </header>
    );
}
