import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';
import onError from '../utils/onError';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({onError}),
  queryCache: new QueryCache({onError}),
});

export default queryClient;
