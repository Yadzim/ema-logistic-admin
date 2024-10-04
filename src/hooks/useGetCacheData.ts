import {
  QueryObserverOptions,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import { QUERY_DATA } from "config/utils/setting";
import { IBaseAllData } from "models/base";
import { CLIENT_API } from "services/client.request";

type TypeGetAllData = {
  queryKey: Array<string | number | undefined | any>;
  url: string;
  params?: Record<string | number, any>;
  options?: QueryObserverOptions<any>;
};
const useGetCacheData = ({
  queryKey,
  url,
  options,
  params,
}: TypeGetAllData & Omit<QueryObserverOptions, "queryKey, queryFn">) => {
  // const queryClient = useQueryClient();

  const response = useQuery<IBaseAllData>({
    queryKey: [...queryKey],
    queryFn: () => CLIENT_API.getAll({ url, params }),
    staleTime: QUERY_DATA.stale_time,
    ...options,
  });

  // if (!response.data && !response.isLoading && !response.error) {
  //   queryClient.prefetchQuery([...queryKey], () =>
  //     CLIENT_API.getAll({ url, _params: params })
  //   );
  // }

  return { ...response };
};

export default useGetCacheData;
