import { Grid } from "@mui/material";

import DataTable from "components/datatable";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";

import { TableContainer } from "./index.styles";

interface IPriceTable {
  isLoading: boolean;
}

// Define the order of predefined columns
const predefinedOrder = [
  "date",
  "open",
  "high",
  "close",
  "volume",
  "movement",
];

export default function SharePriceTable({ isLoading }: IPriceTable) {
  const { stockPriceData } = useAppSelector(getAppDataSelector);

  const data = stockPriceData.data.map((dt, index) => {
    return {
      ...dt,
      id: `${index}-${dt.date}`,
    };
  });


  return (
    <TableContainer>
      <Grid container>
        <Grid item xs={8}>
          <DataTable
            predefinedOrder={predefinedOrder}
            data={data}
            isLoading={isLoading}
            height={"700px"}
          />
        </Grid>
      </Grid>
    </TableContainer>
  );
}
