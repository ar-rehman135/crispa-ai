import { toast } from "react-toastify";

import { useEntryLists } from "hooks/useEntryListData";
import { useAppDispatch } from "hooks/useReduxTypedHooks";
import { setEntryListData } from "store/app";
import { IEntryListData } from "store/app/types";

import EntryListTable from "./table";

export default function EntryList() {
  const dispatch = useAppDispatch();

  const onSuccess = (data: IEntryListData[]) => {
    if (data) {
      dispatch(setEntryListData(data));
    }
  };

  const onError = (error: Error | any) => {
    toast.error(
      error instanceof Error
        ? error.message
        : "Error fetching entry list table data"
    );
  };

  const { isLoading } = useEntryLists({
    onSuccess,
    onError,
    enabledOnMount: true,
  });

  return <EntryListTable isLoading={isLoading} />;
}
