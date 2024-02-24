import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useAppDispatch } from "./useReduxTypedHooks";
import { fetchEntryListTableData } from "apis/api";
import {  setEntryListData} from "store/app";

export const useEntryListData = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error , refetch} = useQuery(["entryListData"], () => fetchEntryListTableData(), {
    enabled: true, 
    onSuccess: (data) => {
        dispatch(setEntryListData(data));
      },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Error fetching entry list table data");
    }
  });


  return { isLoading, error, refetch };
};
