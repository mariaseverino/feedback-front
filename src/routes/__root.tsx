import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import type { QueryClient } from '@tanstack/react-query';
import type { User } from '@/lib/api';

interface MyRouterContext {
    queryClient: QueryClient;
    user: User | undefined;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <Outlet />
        </>
    ),
});
