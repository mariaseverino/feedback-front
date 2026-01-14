import { getMe } from '@/lib/api';
import { auth } from '@/lib/auth.client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}

export function useListOrganizations() {
    return useQuery({
        queryKey: ['organizations'],
        queryFn: async () => {
            const { data, error } = await auth.organization.list();

            if (error) {
                throw new Error(error.message || 'Erro ao listar organizações');
            }

            return data ?? [];
        },
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}

export function useSetActiveOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        // O parâmetro 'organizationId' entra aqui na mutationFn
        mutationFn: async (organizationId: string) => {
            const { error, data } = await auth.organization.setActive({
                organizationId,
            });

            if (error) {
                throw new Error(
                    error.message || 'Erro ao definir organização ativa'
                );
            }

            return data;
        },
        // O "pulo do gato": invalidar as queries para a UI atualizar sozinha
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
            // Se você tiver uma query específica para a org ativa, invalide ela também
            queryClient.invalidateQueries({ queryKey: ['activeOrganization'] });
        },
    });
}
