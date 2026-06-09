import { auth } from '@/lib/auth.client';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    Component,
    LogOut,
    MessageCircleQuestionMark,
    MessageSquare,
    MessagesSquare,
    Send,
    Settings,
    Users,
    type LucideIcon,
} from 'lucide-react';

const mainLinks = [
    {
        to: '/visao-geral',
        icon: Component,
        label: 'Visão Geral',
    },
    {
        to: '/feedbacks',
        icon: MessageSquare,
        label: 'Feedbacks',
    },
    {
        to: '/enviar-feedback',
        icon: Send,
        label: 'Enviar Feedback',
    },
    {
        to: '/membros',
        icon: Users,
        label: 'Membros',
    },
];

const secondaryLinks = [
    {
        to: '/configuracoes',
        icon: Settings,
        label: 'Configurações',
    },
    {
        to: '/ajuda',
        icon: MessageCircleQuestionMark,
        label: 'Ajuda',
    },
];

export function SideBar() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    async function handleLogOut() {
        queryClient.removeQueries({ queryKey: ['me'] });
        navigate({ to: '/signIn' });
        await auth.signOut();
    }

    return (
        <aside className="fixed left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto py-10 px-8">
            <div className="flex flex-col items-start">
                <div className="flex mb-12 gap-2 text-primary items-center text-2xl font-semibold pl-2">
                    <MessagesSquare size={32} />
                    Ecoa
                </div>

                <div className="flex flex-col gap-10 rounded-[54px] bg-white p-2 shadow-sm">
                    <div className="flex flex-col gap-1">
                        {mainLinks.map((item) => (
                            <SidebarItem key={item.to} {...item} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-1">
                        {secondaryLinks.map((item) => (
                            <SidebarItem key={item.to} {...item} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 items-start pl-2">
                <button
                    onClick={handleLogOut}
                    aria-label="Sair"
                    title="Sair"
                    className="
                        size-15 rounded-full flex items-center justify-center
                        transition-colors hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut />
                </button>

                <Avatar className="size-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
            </div>
        </aside>
    );
}

function SidebarItem({
    to,
    icon: Icon,
    label,
}: {
    to: string;
    icon: LucideIcon;
    label: string;
}) {
    return (
        <Link
            to={to}
            aria-label={label}
            title={label}
            className="
                size-15 rounded-full flex items-center justify-center
                transition-all duration-200 text-2xl hover:bg-primary/5
                [&.active]:bg-primary [&.active]:text-white"
        >
            <Icon />
        </Link>
    );
}
