import EntryListTable from "./table";
import { useEntryListData } from "hooks/useEntryListData";

export default function EntryList() {
  const { isLoading } = useEntryListData();

  return <EntryListTable isLoading={isLoading} />;
}
