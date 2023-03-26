import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 * 1, refetchOnWindowFocus: false },
  },
});
