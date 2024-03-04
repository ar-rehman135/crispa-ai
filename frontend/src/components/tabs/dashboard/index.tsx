import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import CashOnHandChart from "./cash-on-hand";
import MonthlyCashFlowChart from "./monthly-cash-flow";
import { useGenerateReport } from "hooks/useGenerateReport";
import { useAppDispatch } from "hooks/useReduxTypedHooks";
import { setReportData } from "store/app";
import { IReportData } from "store/app/types";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const onSuccess = (data: IReportData) => {
    if (data) {
      dispatch(setReportData(data));
    }
  };

  const onError = (error: Error | any) => {
    toast.error(
      error instanceof Error
        ? error.message
        : "Error fetching report data table data"
    );
  };

  const { isLoading } = useGenerateReport({
    onSuccess,
    onError,
    enabledOnMount: true,
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <CashOnHandChart isLoading={isLoading}  />
      </Grid>
      <Grid item xs={12}>
        <MonthlyCashFlowChart />
      </Grid>
    </Grid>
  );
}
