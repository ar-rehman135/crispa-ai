import {
  GridCellParams,
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";
import { Chip, Grid } from "@mui/material";
import DataTable from "components/datatable";
import { TableContainer } from "./index.styles";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";

const chipColors = {
  BOOKED: { backgroundColor: "#D0F2F0", textColor: "#11D1C6" },
  DRAFT: { backgroundColor: "#DEE9FC", textColor: "#4E80EE" },
  OVERDUE: { backgroundColor: "#F2C6C6", textColor: "#EB1919" },
  VOIDED: { backgroundColor: "#D2D2D2", textColor: "#3D3D3D" },
  DEFAULT: { backgroundColor: "#ffffff", textColor: "#000000" },
};

const getChipColors = (status) => chipColors[status] || chipColors.DEFAULT;

const capitalizeFirstLetter = (value) =>
  value.charAt(0).toUpperCase() + value.slice(1);
const renderCapitalizedCell = (params: GridCellParams) =>
  capitalizeFirstLetter(params.value);
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridCellParams) => (params.value as string).slice(-4),
  },
  {
    field: "description",
    headerName: "DESCRIPTION",
    width: 200,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "date",
    headerName: "DATE",
    width: 110,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "account",
    headerName: "ACCOUNT",
    width: 130,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "type",
    headerName: "TYPE",
    width: 130,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCapitalizedCell,
  },
  {
    field: "currency",
    headerName: "CURRENCY",
    width: 130,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "amount",
    headerName: "NET",
    width: 130,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "fxRate",
    headerName: "FX RATE",
    width: 130,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => {
      return 7.45;
    },
  },
  {
    field: "convertedCurrency",
    headerName: "CONVERTED CURRENCY",
    width: 250,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => "EDK",
  },
  {
    field: "convertedNet",
    headerName: "CONVERTED NET",
    width: 170,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridCellParams) => {
      const convertedNetValue = 7.45;
      const amountValue = params.row.amount;
      const result = convertedNetValue * amountValue;
      return result.toFixed(2);
    },
  },
  {
    field: "defaultType",
    headerName: "TYPE",
    width: 130,
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridCellParams) => {
      const { backgroundColor, textColor } = getChipColors(
        (params.value as string).toUpperCase()
      );
      return (
        <Chip
          label={(params.value as string).toUpperCase()}
          size="small"
          style={{ backgroundColor, color: textColor }}
        />
      );
    },
  },
  {
    field: "status",
    headerName: "STATUS",
    width: 120,
    renderCell: (params: GridCellParams) => {
      const statusValue = (params.value as string).toUpperCase();
      const { backgroundColor, textColor } = getChipColors(statusValue);
      return (
        <Chip
          label={statusValue as string}
          size="small"
          style={{
            backgroundColor,
            color: textColor,
          }}
        />
      );
    },
    align: "left",
    headerAlign: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "reconciled",
    headerName: "RECONCILED",
    width: 130,
    renderCell: (params: GridCellParams) => {
      return (
        <Chip
          label={params.value ? "YES" : "NO"}
          size="small"
          style={{
            backgroundColor: params.value
              ? "rgba(11, 194, 117, 0.25)"
              : "rgba(242, 198, 198, 1)",
            color: params.value ? "#03A661" : "#EB1919",
          }}
        />
      );
    },
  },
];

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
          />
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default EntryListTable;
