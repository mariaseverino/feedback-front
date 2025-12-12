import { getMe } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_internal/overview')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useQuery({
        queryKey: ['current_user'],
        queryFn: () => getMe(),
    });

    return <div>{data?.email}</div>;
}
