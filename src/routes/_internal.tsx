import { SideBar } from '@/components/sidebar';
import { getMe } from '@/lib/api';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_internal')({
    component: InternalLayout,
    beforeLoad: async ({ context: { user, queryClient } }) => {
        user =
            queryClient.getQueryData(['me']) ??
            (await queryClient
                .fetchQuery({
                    queryKey: ['me'],
                    queryFn: getMe,
                })
                .catch(() => undefined));

        if (!user) {
            throw redirect({ to: '/signIn' });
        }

        return { user };
    },
});

export function InternalLayout() {
    return (
        <div className="flex min-h-screen w-screen bg-background overflow-hidden relative">
            <SideBar />

            <main className="w-full pr-18 py-11 pl-43 pt-3">
                <Outlet />
            </main>
        </div>
    );
}
