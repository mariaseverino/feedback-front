import {
    createFileRoute,
    Link,
    Outlet,
    redirect,
    useNavigate,
} from '@tanstack/react-router';

import { DoorOpen, MessagesSquare, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

// export const queryClient = new QueryClient();

export const Route = createFileRoute('/_internal')({
    component: InternalLayout,
    // beforeLoad: async ({ context }) => {
    //     const currentUser = await context.queryClient.ensureQueryData({
    //         queryKey: ['profile'],
    //         queryFn: getMe,
    //     });

    //     if (!currentUser) throw redirect({ to: '/login' });

    //     return { currentUser };
    // },
});

export function InternalLayout() {
    // const { currentUser } = Route.useRouteContext();

    return (
        <div className="bg-(--background-color) min-h-screen flex flex-col">
            {/* <NavBar /> */}
            <Header />

            <main className={`lg:w-7xl flex m-auto grow w-screen`}>
                <Outlet />
            </main>
        </div>
    );
}

// export function NavBar() {
//     const [theme, setTheme] = useState('dark');
//     const navigate = useNavigate();

//     function handleTheme() {
//         setTheme((prevTheme) => {
//             const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
//             localStorage.setItem('theme', newTheme);
//             return newTheme;
//         });
//     }

//     const { data: currentUser } = useCurrentUser();

//     const initials = currentUser?.name
//         .split(' ')
//         .map((n) => n[0])
//         .slice(0, 2)
//         .join('')
//         .toUpperCase();

//     async function handleLogout() {
//         await auth.signOut();
//         queryClient.removeQueries({ queryKey: ['profile'] });
//         navigate({ to: '/login' });
//     }

//     // useEffect(() => {
//     //     console.log(isAuthenticated);
//     //     if (!isAuthenticated) {
//     //         navigate({ to: '/login' });
//     //     }
//     // }, [isAuthenticated]);

//     // useEffect(() => {
//     //     function getThemeFromStorage() {
//     //         const storedTheme = localStorage.getItem('theme');
//     //         if (storedTheme) {
//     //             setTheme(storedTheme);
//     //         }
//     //     }
//     //     getThemeFromStorage();
//     // }, []);

//     return (
//         <header className="bg-white fixed w-screen shadow-sm z-50">
//             <div className="container mx-auto px-6 pt-5 flex flex-col">
//                 <div className="flex justify-between items-center pb-5">
//                     <div className="flex items-center gap-4 text-(--color-primary)">
//                         <MessagesSquare className="size-8" />
//                         <span className="font-bold text-xl md:block hidden">
//                             {currentUser?.organization}
//                         </span>
//                     </div>
//                     <div className="flex gap-3 md:gap-4 items-center">
//                         {/* <button
//                             onClick={handleTheme}
//                             className="rounded-full bg-(--color-primary) text-white shadow-md hover:scale-105 transition-transform cursor-pointer p-2.5 md:p-3"
//                             aria-label="Alternar tema"
//                         >
//                             {theme === 'dark' ? (
//                                 <Sun size={22} />
//                             ) : (
//                                 <Moon size={22} />
//                             )}
//                         </button> */}
//                         <div className="flex items-center p-2.5 md:py-1.5 md:px-2.5 bg-[#F2F5FA] rounded-full justify-between md:w-64">
//                             <div className="md:flex gap-2 items-center hidden">
//                                 <div className="bg-indigo-100 text-indigo-600 rounded-full w-9 h-9 flex items-center justify-center font-semibold">
//                                     {initials}
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <span className="font-medium">
//                                         {currentUser?.name}
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         {currentUser?.email}
//                                     </span>
//                                 </div>
//                             </div>
//                             <button
//                                 className="cursor-pointer text-(--color-muted-text)"
//                                 onClick={handleLogout}
//                             >
//                                 <DoorOpen />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 {currentUser && Can(currentUser.role, 'view_navbar') && (
//                     <nav className="flex">
//                         <Link
//                             to="/dashboard"
//                             className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
//                         >
//                             Dashboard
//                         </Link>
//                         <Link
//                             to="/team"
//                             className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
//                         >
//                             Equipe
//                         </Link>
//                         <Link
//                             to="/feedback"
//                             className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
//                         >
//                             Feedbacks
//                         </Link>
//                         {currentUser &&
//                             Can(currentUser.role, 'view_billing') && (
//                                 <Link
//                                     to="/billing"
//                                     className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
//                                 >
//                                     Plano & Pagamentos
//                                 </Link>
//                             )}
//                         {/* <Link
//                             to="/help"
//                             className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
//                         >
//                             Ajuda
//                         </Link> */}
//                         {/* <NavItem
//                             to="dashboard"
//                             label="Visão Geral"
//                             active={location.pathname === '/dashboard'}
//                         />
//                         <NavItem
//                             to="equipe"
//                             label="Equipe"
//                             active={location.pathname === '/equipe'}
//                         />
//                         <NavItem
//                             to="feedback"
//                             label="Feedbacks"
//                             active={location.pathname === '/feedback'}
//                         />
//                         {currentUser &&
//                             Can(currentUser.role, 'view_billing') && (
//                                 <NavItem
//                                     to="plano-&-pagamento"
//                                     label="Plano & Pagamentos"
//                                     active={
//                                         location.pathname ===
//                                         '/plano-&-pagamento'
//                                     }
//                                 />
//                             )}
//                         <NavItem
//                             to="/ajuda"
//                             label="Ajuda"
//                             active={location.pathname === '/ajuda'}
//                         /> */}
//                     </nav>
//                 )}
//             </div>
//         </header>
//     );
// }

// import superHeroi1 from '../assets/super-heroi1.png';
// import superHeroi2 from '../assets/super-heroi2.png';
// import superHeroi3 from '../assets/super-heroi3.png';
// import superHeroi4 from '../assets/super-heroi4.png';

// const getIcon = (iconSlug: string) => {
//     switch (iconSlug) {
//         case 'superHeroi1':
//             return (
//                 // <div className="p-1 bg-amber-500 rounded-md">
//                 <img
//                     src={superHeroi1}
//                     alt="superHeroi1"
//                     className="size-7 bg-amber-500 rounded-md"
//                 />
//                 // </div>
//             );
//         case 'superHeroi2':
//             return <img src={superHeroi2} alt="superHeroi2" className="" />;
//         case 'superHeroi3':
//             return <img src={superHeroi3} alt="superHeroi3" />;
//         case 'superHeroi4':
//             return <img src={superHeroi4} alt="superHeroi4" />;
//         default:
//             return <img src={superHeroi1} alt="superHeroi1" />;
//     }
// };

export function Header() {
    return (
        <header className="text-(--title) pt-4 px-10 flex flex-col gap-4 relative bg-(--card-color)">
            {/* <div className="h-0.25 w-full bg-gray-300 absolute bottom-0 left-0"></div> */}
            <div className="flex justify-between">
                <MessagesSquare className="size-8" />
                <div className="flex gap-2">
                    {/* {getIcon('superHeroi1')} */}
                    Maria
                </div>
            </div>
            <nav className="z-50 flex gap-6">
                <Link
                    to="/overview"
                    className="pb-2 [&.active]:border-b-3 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium"
                >
                    Dashboard
                </Link>
                <Link
                    to="/overview"
                    className="pb-2 [&.active]:border-b-3 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium"
                >
                    Equipe
                </Link>
                <Link
                    to="/overview"
                    className="pb-2 [&.active]:border-b-3 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium"
                >
                    Feedbacks
                </Link>
                <Link
                    to="/overview"
                    className="pb-2 [&.active]:border-b-3 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium"
                >
                    Plano & Pagamentos
                </Link>
            </nav>
        </header>
    );
}
