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
import { COLORS } from "colors";

const chipColors = {
  BOOKED: { backgroundColor: COLORS.primary?.[200], textColor: COLORS.primary?.[600] },
  DRAFT: { backgroundColor: COLORS.secondary?.[600], textColor: COLORS.secondary?.[200] },
  OVERDUE: { backgroundColor: COLORS.success?.[400], textColor: COLORS.warning?.[100] },
  VOIDED: { backgroundColor: COLORS.success?.[300], textColor: COLORS.success?.[200] },
  DEFAULT: { backgroundColor: COLORS.common?.white, textColor: COLORS.common?.black },
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
              ? COLORS.info?.[100]
              : COLORS.info?.[200],
            color: params.value ? COLORS.success?.[100] : COLORS.warning?.[100],
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
