import {
    getInvitation,
    getMyPosition,
    getRanking,
    inviteMembers,
} from '@/lib/api';
import { auth } from '@/lib/auth.client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type InviteData = {
    email: string;
    organizationId: string;
};

export function useSendInvitation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['invites'],
        mutationFn: async (data: InviteData) => {
            return auth.organization.inviteMember({
                email: data.email,
                role: 'member',
                organizationId: data.organizationId,
                resend: true,
            });
        },

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['invites'],
            });
        },
    });
}

export function useSendInvitationWithCsv() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['invites'],
        mutationFn: async ({
            organizationId,
            formData,
        }: {
            organizationId: string;
            formData: FormData;
        }) => inviteMembers(organizationId, formData),

        onSuccess(data, variables, onMutateResult, context) {
            console.log(data);
            console.log(variables);
            console.log(context);
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

export function useGetMembers(organizationId: string) {
    return useQuery({
        queryKey: ['members', organizationId],
        queryFn: () =>
            auth.organization.listMembers({
                query: {
                    organizationId: organizationId,
                    limit: 100,
                    offset: 0,
                    sortBy: 'createdAt',
                    sortDirection: 'desc',
                },
            }),
        select: (res) =>
            res.data?.members.map((member) => ({
                userId: member.user.id,
                name: member.user.name,
                email: member.user.email,
                role: member.role,
                createdAt: member.createdAt,
            })) ?? [],
    });
}

export function useGetInvitation(invitationId: string) {
    return useQuery({
        queryKey: ['invitation', invitationId],
        queryFn: async () => getInvitation(invitationId),
    });
}
