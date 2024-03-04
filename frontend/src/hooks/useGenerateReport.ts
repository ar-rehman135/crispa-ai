import { useQuery } from "react-query";

import { fetchReportData } from "services/api";

interface useGenerateReportOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  enabledOnMount?: boolean;
}

export const useGenerateReport = (options: useGenerateReportOptions) => {
  const { onError, onSuccess, enabledOnMount = true } = options;

  const { isLoading, error, refetch } = useQuery(
    ["reportData"],
    () => fetchReportData(),
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
