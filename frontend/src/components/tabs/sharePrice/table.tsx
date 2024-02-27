import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

import DataTable from "components/datatable";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";

import { CustomChip } from "components/chip";
import { getChipColors } from "utils";

import { TableContainer } from "./index.styles";

interface IPriceTable {
  isLoading: boolean;
}

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    type: "string",
    width: 150,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "open",
    headerName: "Open",
    type: "number",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "high",
    headerName: "High",
    type: "number",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "close",
    headerName: "Close",
    type: "number",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "volume",
    headerName: "Volume",
    type: "number",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "movement",
    headerName: "Movement",
    type: "string",
    width: 200,
    align: "left",
    headerAlign: "left",
    renderCell: (params: GridCellParams) => {
      const label = (params.value as string).toUpperCase();
      const { backgroundColor, textColor } = getChipColors(label);
      return (
        <CustomChip
          label={label}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      );
    },
  },
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
            columns={columns}
            data={data}
            isLoading={isLoading}
            height={"700px"}
          />
        </Grid>
      </Grid>
    </TableContainer>
  );
}
