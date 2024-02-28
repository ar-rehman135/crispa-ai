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

// Define the order of predefined columns with minWidth
const columnsOrderWithMinWidth = [
  { field: "date", minWidth: 150 },
  { field: "open", minWidth: 130 },
  { field: "high", minWidth: 130 },
  { field: "close", minWidth: 130 },
  { field: "volume", minWidth: 180 },
  { field: "movement", minWidth: 250 },
];

export default function SharePriceTable({ isLoading }: IPriceTable) {
  const { stockPriceData } = useAppSelector(getAppDataSelector);

  const data = stockPriceData.data.map((dt, index) => {
    return {
      ...dt,
      id: `${index}-${dt.date}`,
    };
  });

  // Dynamically generate columns based on data keys
  const dynamicColumns: GridColDef[] = Object.keys(data[0]).map((key) => {
    const isNumeric =
      typeof data[0][key] === "number" || /^\d+$/.test(data[0][key].toString());
    return {
      field: key,
      headerName: key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()), // Replace '_' with ' ' and capitalize first letter
      type: isNumeric ? "number" : "string",
      align: isNumeric ? "right" : "left",
      headerAlign: isNumeric ? "right" : "left",
      renderCell:
        key === "movement"
          ? (params: GridCellParams) => {
              const label = (params.value as string).toUpperCase();
              const { backgroundColor, textColor } = getChipColors(label);
              return (
                <CustomChip
                  label={label}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                />
              );
            }
          : undefined, // If it's not 'movement' column, set renderCell to undefined
    };
  });

  // Sort predefined columns based on order
  const columns: GridColDef[] = columnsOrderWithMinWidth
    .map(({ field, minWidth }) => {
      const col = dynamicColumns.find((col) => col.field === field);
      if (col) {
        col.minWidth = minWidth;
      }
      return col;
    })
    .filter((col) => col !== undefined) as GridColDef[];

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
