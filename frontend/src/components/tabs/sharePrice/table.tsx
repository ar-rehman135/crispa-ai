import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Chip, Grid } from "@mui/material";

import DataTable from "components/datatable";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";

import { TableContainer } from "./index.styles";

import { COLORS } from "colors";

export default function SharePriceTable() {
  const { stockPriceData, stockLoading } = useAppSelector(getAppDataSelector);

  const getChipColors = (value: string) => {
    let backgroundColor = COLORS.primary?.[200];
    let textColor = COLORS.primary?.[600];
    switch (value) {
      case "up":
        backgroundColor = COLORS.primary?.[200];
        textColor = COLORS.primary?.[600];
        break;
      case "down":
        backgroundColor = COLORS.success?.[400];
        textColor = COLORS.warning?.[100];
        break;
      case "flat":
        backgroundColor = COLORS.secondary?.[600];
        textColor = COLORS.secondary?.[200];
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
