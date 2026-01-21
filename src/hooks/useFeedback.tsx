import {
    getReceivedsFeedbacks,
    sendFeedback,
    type Member,
    type SendFeedbackDto,
} from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetReceivedsFeedback() {
    return useQuery({
        queryKey: ['feedbacks'],
        queryFn: getReceivedsFeedbacks,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}

export function useSendFeedback() {
    return useMutation({
        mutationFn: async (data: SendFeedbackDto) => sendFeedback(data),
        onSuccess: () => {
            console.log({ mensage: 'feedback enviado' });
        },
    });
}
