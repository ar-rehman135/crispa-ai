// import {
//   GridCellParams,
//   GridColDef,
//   GridColumnGroupingModel,
// } from "@mui/x-data-grid";
// import { Grid } from "@mui/material";

// import DataTable from "components/datatable";
// import { useAppSelector } from "hooks/useReduxTypedHooks";
// import { getAppDataSelector } from "store/app";
// import { COLORS } from "colors";
// import { CustomChip } from "components/chip";
// import { capitalizeFirstLetter, getChipColors } from "utils";

// import { TableContainer } from "./index.styles";

// const renderCapitalizedCell = (params: GridCellParams) =>
//   capitalizeFirstLetter(params.value as string);

// const columns: GridColDef[] = [
//   {
//     field: "id",
//     headerName: "ID",
//     renderCell: (params: GridCellParams) => (params.value as string).slice(-4),
//     minWidth: 100,
//   },
//   {
//     field: "description",
//     headerName: "DESCRIPTION",
//     minWidth: 250,
//   },
//   {
//     field: "date",
//     headerName: "DATE",
//     minWidth: 100,
//   },
//   {
//     field: "account",
//     headerName: "ACCOUNT",
//     minWidth: 180,
//   },
//   {
//     field: "type",
//     headerName: "TYPE",
//     renderCell: renderCapitalizedCell,
//     minWidth: 100,
//   },
//   {
//     field: "currency",
//     headerName: "CURRENCY",
//     minWidth: 150,
//   },
//   {
//     field: "amount",
//     headerName: "NET",
//     minWidth: 110,
//   },
//   {
//     field: "fxRate",
//     headerName: "FX RATE",
//     renderCell: () => {
//       return 7.45;
//     },
//     minWidth: 150,
//   },
//   {
//     field: "convertedCurrency",
//     headerName: "CURRENCY",
//     renderCell: () => "EDK",
//     minWidth: 150,
//   },
//   {
//     field: "convertedNet",
//     headerName: "NET",
//     align: "right",
//     headerAlign: "right",
//     renderCell: (params: GridCellParams) => {
//       const convertedNetValue = 7.45;
//       const amountValue = params.row.amount;
//       const result = convertedNetValue * amountValue;
//       return result.toFixed(2);
//     },
//     minWidth: 110,
//   },
//   {
//     field: "defaultType",
//     headerName: "TYPE",
//     minWidth: 120,
//     renderCell: renderCapitalizedCell,
//   },
//   {
//     field: "status",
//     headerName: "STATUS",
//     minWidth: 120,
//     renderCell: (params: GridCellParams) => {
//       const label = (params.value as string).toUpperCase();
//       const { backgroundColor, textColor } = getChipColors(label);
//       return (
//         <CustomChip
//           label={label}
//           backgroundColor={backgroundColor}
//           textColor={textColor}
//         />
//       );
//     },
//   },
//   {
//     field: "reconciled",
//     headerName: "RECONCILED",
//     minWidth: 200,
//     renderCell: (params: GridCellParams) => {
//       const backgroundColor = params.value
//         ? COLORS.info?.[100]
//         : COLORS.info?.[200];
//       const textColor = params.value
//         ? COLORS.success?.[100]
//         : COLORS.warning?.[100];
//       const label = params.value ? "YES" : "NO";
//       return (
//         <CustomChip
//           label={label}
//           backgroundColor={backgroundColor}
//           textColor={textColor}
//         />
//       );
//     },
//   },
// ];

// columns.forEach((col: GridColDef) => {
//   col.disableColumnMenu = true;
//   if (col.headerName === "NET" || col.headerName === "FX RATE") {
//     col.align = "right";
//     col.headerAlign = "right";
//     return;
//   }
//   col.align = "left";
//   col.headerAlign = "left";
// });

// const columnGroupingModel: GridColumnGroupingModel = [
//   {
//     groupId: "INPUT AMOUNTS",
//     description: "",
//     children: [{ field: "currency" }, { field: "amount" }],
//   },
//   {
//     groupId: "CONVERTED AMOUNTS",
//     description: "",
//     children: [{ field: "convertedCurrency" }, { field: "convertedNet" }],
//   },
// ];

// interface IEntryListTable {
//   isLoading: boolean;
// }

// const EntryListTable = ({ isLoading }: IEntryListTable) => {
//   const { entryListData } = useAppSelector(getAppDataSelector);

//   return (
//     <TableContainer>
//       <Grid container>
//         <Grid item xs={12}>
//           <DataTable
//             columns={columns}
//             data={entryListData}
//             isLoading={isLoading}
//             columnGroupingModel={columnGroupingModel}
//             height={"calc(100vh - 150px)"}
//           />
//         </Grid>
//       </Grid>
//     </TableContainer>
//   );
// };

// export default EntryListTable;

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
import { getChipColors } from "utils";

import { TableContainer } from "./index.styles";

const columnsOrderWithMinWidth = [
  { field: "id", minWidth: 100 },
  { field: "description", minWidth: 250 },
  { field: "date", minWidth: 150 },
  { field: "account", minWidth: 180 },
  { field: "type", minWidth: 150 },
  { field: "currency", minWidth: 180 },
  { field: "amount", minWidth: 110 },
  { field: "fx Rate", minWidth: 150 },
  { field: "convertedCurrency", minWidth: 180 },
  { field: "convertedNet", minWidth: 110 },
  { field: "defaultType", minWidth: 150 },
  { field: "status", minWidth: 150 },
  { field: "reconciled", minWidth: 200 },
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
  const FX_RATE = 7.45;

  const dynamicColumns: GridColDef[] = columnsOrderWithMinWidth.map((col) => {
    const isNumeric =
      (entryListData.length > 0 &&
        typeof entryListData[0][col.field] === "number" &&
        !isNaN(entryListData[0][col.field])) ||
      col.field === "fx Rate" || col.field === "convertedNet";

    return {
      field: col.field,
      headerName:
        col.field === "amount"
          ? "Net"
          : col.field === "convertedCurrency"
          ? "Currency"
          : col.field === "defaultType"
          ? "Type"
          : col.field === "convertedNet"
          ? "Net"
          : col.field.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
      type: isNumeric ? "number" : "string",
      align: isNumeric ? "right" : "left",
      headerAlign: isNumeric ? "right" : "left",
      minWidth: col.minWidth,
      renderCell:
        col.field === "id"
          ? (params: GridCellParams) => {
              return (params.value as string).slice(-4);
            }
          : col.field === "fx Rate"
          ? (params: GridCellParams) => {
              return FX_RATE;
            }
          : col.field === "status"
          ? (params: GridCellParams) => {
            console.log({params})
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
          : col.field === "reconciled"
          ? (params: GridCellParams) => {
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
            }
          : col.field === "convertedNet"
          ? (params: GridCellParams) => {
              const convertedNetValue = 7.45; // Replace this with your logic
              const amountValue = params.row.amount || 0; // Add null-check here
              const result = convertedNetValue * amountValue;
              return result;
            }
          : undefined,
    };
  });

  return (
    <TableContainer>
      <Grid container>
        <Grid item xs={12}>
          <DataTable
            columns={dynamicColumns}
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
