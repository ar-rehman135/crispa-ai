import {
  GridCellParams,
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";
import { Grid } from "@mui/material";

import DataTable from "components/datatable";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";
import { COLORS } from "colors";
import { CustomChip } from "components/chip";
import { capitalizeFirstLetter, getChipColors } from "utils";

import { TableContainer } from "./index.styles";

const renderCapitalizedCell = (params: GridCellParams) =>
  capitalizeFirstLetter(params.value as string);

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderCell: (params: GridCellParams) => (params.value as string).slice(-4),
    minWidth: 100,
  },
  {
    field: "description",
    headerName: "DESCRIPTION",
    minWidth: 250,
  },
  {
    field: "date",
    headerName: "DATE",
    minWidth: 100,
  },
  {
    field: "account",
    headerName: "ACCOUNT",
    minWidth: 180,
  },
  {
    field: "type",
    headerName: "TYPE",
    renderCell: renderCapitalizedCell,
    minWidth: 100,
  },
  {
    field: "currency",
    headerName: "CURRENCY",
    minWidth: 150,
  },
  {
    field: "amount",
    headerName: "NET",
    minWidth: 110,
  },
  {
    field: "fxRate",
    headerName: "FX RATE",
    renderCell: () => {
      return 7.45;
    },
    minWidth: 150,
  },
  {
    field: "convertedCurrency",
    headerName: "CURRENCY",
    renderCell: () => "EDK",
    minWidth: 150,
  },
  {
    field: "convertedNet",
    headerName: "NET",
    align: "right",
    headerAlign: "right",
    renderCell: (params: GridCellParams) => {
      const convertedNetValue = 7.45;
      const amountValue = params.row.amount;
      const result = convertedNetValue * amountValue;
      return result.toFixed(2);
    },
    minWidth: 110,
  },
  {
    field: "defaultType",
    headerName: "TYPE",
    minWidth: 120,
    renderCell: renderCapitalizedCell,
  },
  {
    field: "status",
    headerName: "STATUS",
    minWidth: 120,
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
  {
    field: "reconciled",
    headerName: "RECONCILED",
    minWidth: 200,
    renderCell: (params: GridCellParams) => {
      const backgroundColor = params.value
        ? COLORS.info?.[100]
        : COLORS.info?.[200];
      const textColor = params.value
        ? COLORS.success?.[100]
        : COLORS.warning?.[100];
      const label = params.value ? "YES" : "NO";
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

columns.forEach((col: GridColDef) => {
  col.disableColumnMenu = true;
  if (col.headerName === "NET" || col.headerName === "FX RATE") {
    col.align = "right";
    col.headerAlign = "right";
    return;
  }
  col.align = "left";
  col.headerAlign = "left";
});

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "INPUT AMOUNTS",
    description: "",
    children: [{ field: "currency" }, { field: "amount" }],
  },
  {
    groupId: "CONVERTED AMOUNTS",
    description: "",
    children: [{ field: "convertedCurrency" }, { field: "convertedNet" }],
  },
];

interface IEntryListTable {
  isLoading: boolean;
}

const EntryListTable = ({ isLoading }: IEntryListTable) => {
  const { entryListData } = useAppSelector(getAppDataSelector);

  return (
    <TableContainer>
      <Grid container>
        <Grid item xs={12}>
          <DataTable
            columns={columns}
            data={entryListData}
            isLoading={isLoading}
            columnGroupingModel={columnGroupingModel}
            height={"calc(100vh - 150px)"}
          />
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default EntryListTable;
