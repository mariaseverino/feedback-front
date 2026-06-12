import { getMyPosition, getRanking } from '@/lib/api';
import { auth } from '@/lib/auth.client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type InviteData = {
    email: string;
    organizationId: string;
};

export function useSendInvitation(data: InviteData) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['invites'],
        mutationFn: async () => {
            return auth.organization.inviteMember({
                email: data.email,
                role: 'member',
                organizationId: data.organizationId,
                resend: true,
            });
        },

        onSuccess(_, variables) {
            queryClient.invalidateQueries({
                queryKey: ['invites'],
            });
        },
    });
}

export function useGetRanking() {
    return useQuery({
        queryKey: ['ranking'],
        queryFn: getRanking,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}

export function useGetMyPositionInRanking() {
    return useQuery({
        queryKey: ['my_position'],
        queryFn: getMyPosition,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}
