import { SelectDemo } from '@/components/selectDemo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useListOrganizations, useMe } from '@/hooks/useMe';
import { getMe, type User } from '@/lib/api';
import { auth } from '@/lib/auth.client';
import { Can } from '@/utils/permissions';
import {
    createFileRoute,
    Link,
    Outlet,
    redirect,
    useNavigate,
} from '@tanstack/react-router';

import {
    ChartNoAxesColumn,
    Component,
    LogOut,
    MessageCircleQuestionMark,
    MessageSquare,
    MessagesSquare,
    Moon,
    Send,
    Settings,
    Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_internal')({
    component: InternalLayout,
    beforeLoad: async ({ context }) => {
        const user =
            context.queryClient.getQueryData(['me']) ??
            (await context.queryClient.fetchQuery({
                queryKey: ['me'],
                queryFn: getMe,
            }));

        if (!user) {
            throw redirect({ to: '/signIn' });
        }

        return { user };
    },
});

export function InternalLayout() {
    return (
        <div className="flex h-screen w-screen bg-background py-11 overflow-hidden">
            <SideBar />

            <main className="w-full pr-12">
                <Outlet />
            </main>
        </div>
    );
}

function SideBar() {
    const navigate = useNavigate();
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
        <aside className="px-10 flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-center mb-9">
                    <MessagesSquare className="size-12 text-primary" />
                </div>
                <div className="bg-white rounded-[54px] p-2 flex flex-col gap-10">
                    <div>
                        <Link
                            to="/visao-geral"
                            className="size-15 rounded-full flex items-center justify-center text-2xl [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                        >
                            <Component />
                        </Link>
                        <Link
                            to="/feedbacks"
                            className="size-15 rounded-full flex items-center justify-center text-2xl [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                        >
                            <MessageSquare />
                        </Link>
                        <Link
                            to="/"
                            className="size-15 rounded-full flex items-center justify-center text-2xl [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                        >
                            <Send />
                        </Link>
                        <Link
                            to="/"
                            className="size-15 rounded-full flex items-center justify-center text-2xl [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                        >
                            <ChartNoAxesColumn />
                        </Link>
                    </div>

                    <div>
                        <Link
                            to="/"
                            className="size-15 rounded-full flex items-center justify-center text-2xl [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                        >
                            <Settings />
                        </Link>
                        <Link
                            to="/"
                            className="size-15 rounded-full flex items-center justify-center text-2xl [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                        >
                            <MessageCircleQuestionMark />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
                <button
                    onClick={handleLogOut}
                    className="size-15 rounded-full flex items-center justify-center [&.active]:text-white [&.active]:bg-black hover:bg-black/5"
                >
                    <LogOut />
                </button>

                <Avatar className="size-12 rounded-full">
                    <AvatarImage src="https://github.com/shadcn.png" alt="" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
            </div>
        </aside>
    );
}

export function Header() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const navigate = useNavigate();

    const { data: user, isLoading } = useMe();

    const { data: organizations = [] } = useListOrganizations();
    async function handleLogOut() {
        await auth.signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate({ to: '/signIn' });
                },
            },
        });
    }

    useEffect(() => {
        function getThemeFromStorage() {
            const storedTheme = localStorage.getItem('theme') as
                | 'light'
                | 'dark';
            if (storedTheme) {
                handleChangeTheme(storedTheme);
            } else {
                handleChangeTheme(theme);
            }
        }

        getThemeFromStorage();
    }, []);

    const handleChangeTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    return (
        <header className="text-(--title) pb-1 px-10 flex flex-col gap-8 relative">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <MessagesSquare className="size-8 text-primary" />
                    {organizations && (
                        <SelectDemo
                            itens={organizations}
                            label="Organizacoes"
                            className="min-w-56"
                            value={user?.activeOrganizationId!}
                        />
                    )}
                </div>
                <div className="bg-card/10 flex rounded-full items-center h-7">
                    <button
                        className={`${theme == 'light' ? 'bg-foreground/10' : ''} size-8 rounded-full`}
                        onClick={() => handleChangeTheme('light')}
                    >
                        <Sun className="m-auto size-5" />
                    </button>
                    <button
                        className={`${theme == 'dark' ? 'bg-foreground/10' : ''} size-8 rounded-full`}
                        onClick={() => handleChangeTheme('dark')}
                    >
                        <Moon className="m-auto size-5" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <div className="flex bg-card/10 px-3 py-2 rounded-xl gap-2 items-center">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt={user?.name}
                            />
                            <AvatarFallback className="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user?.name}
                            </span>
                            <span className="truncate text-xs">
                                {user?.email}
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
                {/* {user && Can(user.role, 'view_dashboard') && ( */}
                <Link
                    to="/overview"
                    className="hover:bg-card/10 [&.active]:text-primary [&.active]:font-medium px-3 py-0.5 hover:rounded-t-md [&.active]:border-b-2 [&.active]:border-primary"
                >
                    Overview
                </Link>
                {/* )} */}
                {/* {user && Can(user.role, 'view_team') && ( */}
                <Link
                    to="/members"
                    className="hover:bg-card/10 [&.active]:text-primary [&.active]:font-medium px-3 py-0.5 hover:rounded-t-md [&.active]:border-b-2 [&.active]:border-primary"
                >
                    Equipe
                </Link>
                {/* )} */}
                <Link
                    to="/feedbacks"
                    className="hover:bg-card/10 [&.active]:text-primary [&.active]:font-medium px-3 py-0.5 hover:rounded-t-md [&.active]:border-b-2 [&.active]:border-primary"
                >
                    Feedbacks
                </Link>
                <Link
                    to="/settings"
                    className="hover:bg-card/10 [&.active]:text-primary [&.active]:font-medium px-3 py-0.5 hover:rounded-t-md [&.active]:border-b-2 [&.active]:border-primary"
                >
                    Configurações
                </Link>
            </nav>
        </header>
    );
}
