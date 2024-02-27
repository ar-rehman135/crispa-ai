import { useQuery } from "react-query";

import { fetchEntryLists } from "services/api";
interface useEntryListsOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  enabledOnMount?: boolean;
}

export const useEntryLists = (options: useEntryListsOptions) => {
  const { onError, onSuccess, enabledOnMount = true } = options;

  const { isLoading, error, refetch } = useQuery(
    ["entryLists"],
    () => fetchEntryLists(),
    {
      enabled: enabledOnMount,
      retry: false,
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data);
      },
      onError: (error) => {
        if (onError) onError(error);
      },
    }
  );

  return { isLoading, error, refetch };
};
