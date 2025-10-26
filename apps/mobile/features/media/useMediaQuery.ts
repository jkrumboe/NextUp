import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { MediaItem, MediaSearchParams } from '@vibelink/types';

export function useMediaQuery(params?: Partial<MediaSearchParams> & { enabled?: boolean }) {
  return useQuery({
    queryKey: ['media', params],
    queryFn: async () => {
      const { enabled, ...queryParams } = params || {};
      const { data } = await api.get('/media', { params: queryParams });
      return data;
    },
    enabled: params?.enabled !== false,
  });
}

export function useMediaDetail(id: string) {
  return useQuery({
    queryKey: ['media', id],
    queryFn: async () => {
      const { data } = await api.get<MediaItem>(`/media/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useRateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mediaId,
      score,
      reviewText,
    }: {
      mediaId: string;
      score: number;
      reviewText?: string;
    }) => {
      const { data } = await api.put(`/media/${mediaId}/rating`, { score, reviewText });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['media', variables.mediaId] });
    },
  });
}

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkData: any) => {
      const { data } = await api.post('/links', linkData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}
