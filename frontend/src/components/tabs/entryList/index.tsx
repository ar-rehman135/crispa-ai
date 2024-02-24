import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";

import EntryListTable from "./table";
import { useEntryListData } from "hooks/useEntryListData";

export default function EntryList() {
  const {error } = useEntryListData();
  // useE

  return (
      <EntryListTable />
  );
}
