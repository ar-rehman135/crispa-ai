import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Chip, Grid } from "@mui/material";

import DataTable from "components/datatable";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";

import { TableContainer } from "./index.styles";

export default function SharePriceTable() {
  const { stockPriceData, stockLoading } = useAppSelector(getAppDataSelector);

  const getChipColors = (value: string) => {
    let backgroundColor = "#D0F2F0";
    let textColor = "#11D1C6";
    switch (value) {
      case "up":
        backgroundColor = "#D0F2F0";
        textColor = "#11D1C6";
        break;
      case "down":
        backgroundColor = "#F2C6C6";
        textColor = "#EB1919";
        break;
      case "flat":
        backgroundColor = "#DEE9FC";
        textColor = "#4E80EE";
        break;
      default:
        break;
    }
    return { backgroundColor, textColor };
  };

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
        const movement = params.row.movement as string;
        const { backgroundColor, textColor } = getChipColors(
          movement.toLowerCase()
        );
        return (
          <Chip
            label={movement}
            color="success"
            variant="filled"
            style={{
              borderRadius: 5,
              color: textColor,
              backgroundColor,
              fontWeight: "bolder",
            }}
          />
        );
      },
    },
  ];

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
          <DataTable columns={columns} data={data} isLoading={stockLoading} />
        </Grid>
      </Grid>
    </TableContainer>
  );
}
