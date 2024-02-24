import { Grid } from "@mui/material";
import CashOnHandChart from "./cash-on-hand";
import MonthlyCashFlowChart from "./monthly-cash-flow";

export default function Dashboard() {
  return (
    <Grid container >
      <Grid item xs={12}>
        <CashOnHandChart />
      </Grid>
      <Grid item xs={12}>
        <MonthlyCashFlowChart />
      </Grid>
    </Grid>
  );
}
