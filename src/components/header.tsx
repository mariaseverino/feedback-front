import { useListOrganizations, useMe } from '@/hooks/useMe';
import { auth } from '@/lib/auth.client';
import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut, MessagesSquare, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SelectDemo } from './selectDemo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

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
                    to="/visao-geral"
                    className="hover:bg-card/10 [&.active]:text-primary [&.active]:font-medium px-3 py-0.5 hover:rounded-t-md [&.active]:border-b-2 [&.active]:border-primary"
                >
                    Overview
                </Link>
                {/* )} */}
                {/* {user && Can(user.role, 'view_team') && ( */}
                <Link
                    to="/membros"
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
                    to="/configuracoes"
                    className="hover:bg-card/10 [&.active]:text-primary [&.active]:font-medium px-3 py-0.5 hover:rounded-t-md [&.active]:border-b-2 [&.active]:border-primary"
                >
                    Configurações
                </Link>
            </nav>
        </header>
    );
}
