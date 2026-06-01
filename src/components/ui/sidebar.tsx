import {
    Component,
    LogOut,
    MessageCircleQuestionMark,
    MessageSquare,
    Send,
    Settings,
    Users,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mainMenu = [
    {
        label: 'Visão Geral',
        path: '/visao-geral',
        icon: Component,
    },
    {
        label: 'Feedbacks',
        path: '/feedbacks',
        icon: MessageSquare,
    },
    {
        label: 'Enviar Feedback',
        path: '/enviar-feedback',
        icon: Send,
    },
    {
        label: 'Membros',
        path: '/membros',
        icon: Users,
    },
];

const secondaryMenu = [
    {
        label: 'Configurações',
        path: '/configuracoes',
        icon: Settings,
    },
    {
        label: 'Ajuda',
        path: '/ajuda',
        icon: MessageCircleQuestionMark,
    },
];

function MenuItem({
    to,
    icon: Icon,
    children,
}: {
    to: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <Link
            to={to}
            activeProps={{
                className: 'bg-background text-primary shadow-sm font-semibold',
            }}
            className="
                flex
                items-center
                gap-3
                h-11
                px-4
                rounded-xl
                text-muted-foreground
                font-medium
                transition-all
                duration-200
                hover:bg-muted
            "
        >
            <Icon size={18} />
            <span>{children}</span>
        </Link>
    );
}

export function SideBar() {
    const user = {
        name: 'Comp',
        email: 'comp@ecoa.com',
        avatar: 'https://github.com/shadcn.png',
    };

    const handleLogout = () => {
        console.log('logout');
    };

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                h-screen
                w-72
                bg-white
                px-5
                py-6
                flex
                flex-col
                justify-between
            "
        >
            <div>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-primary text-primary-foreground p-2 rounded-xl">
                        <MessageSquare size={22} />
                    </div>

                    <div>
                        <h1 className="font-bold text-lg">Ecoa</h1>

                        <p className="text-xs text-muted-foreground">
                            Plataforma de Feedback
                        </p>
                    </div>
                </div>

                {/* Menu principal */}
                <nav className="space-y-2">
                    {mainMenu.map((item) => (
                        <MenuItem
                            key={item.path}
                            to={item.path}
                            icon={item.icon}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </nav>

                {/* Separador */}
                <div className="my-6 border-t" />

                {/* Menu secundário */}
                <nav className="space-y-2">
                    {secondaryMenu.map((item) => (
                        <MenuItem
                            key={item.path}
                            to={item.path}
                            icon={item.icon}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </nav>
            </div>

            {/* Footer */}
            <div className="space-y-4">
                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        h-11
                        px-4
                        rounded-xl
                        text-red-500
                        transition-colors
                        hover:bg-red-500/10
                    "
                >
                    <LogOut size={18} />
                    <span>Sair</span>
                </button>

                <div className="border-t pt-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                                {user.name.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 overflow-hidden">
                            <p className="font-medium text-sm truncate">
                                {user.name}
                            </p>

                            <p className="text-xs text-muted-foreground truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
