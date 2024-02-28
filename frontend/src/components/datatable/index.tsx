import React from "react";
import {
  GridColDef,
  GridColumnGroupingModel,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { TableContainer, StyledDataGrid } from "./index.styles";
import CustomCellRender from "./CustomCellRender";

interface IDataTables {
  data: any[];
  isLoading: boolean;
  columnGroupingModel?: GridColumnGroupingModel;
  height?: string | number;
  decimalPlaces?: number;
  showAllEntries?: boolean;
  predefinedOrder?: string[];
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const getCustomHeader = (value: string) => {
  let customizedHeader = "";
  switch (value) {
    case "amount":
      customizedHeader = "Net";
      break;
    case "convertedCurrency":
      customizedHeader = "Currency";
      break;
    case "defaultType":
      customizedHeader = "Type";
      break;
    case "convertedNet":
      customizedHeader = "Net";
      break;
    default:
      customizedHeader = value
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
  }
  return customizedHeader;
};

const getMinWidth = (field: string): number => {
  switch (field) {
    case "amount":
      return 110;
    case "convertedCurrency":
      return 180;
    case "defaultType":
      return 150;
    case "convertedNet":
      return 110;
    case "date":
      return 150;
    case "open":
    case "high":
    case "close":
      return 130;
    case "volume":
      return 180;
    case "movement":
      return 250;
    default:
      return 150; // Default minWidth
  }
};

const DataTable: React.FC<IDataTables> = ({
  data,
  isLoading,
  columnGroupingModel,
  height = 700,
  decimalPlaces = 2,
  showAllEntries = false,
  predefinedOrder = [],
}) => {
  let keys: string[] = [];

  if (predefinedOrder.length > 0) {
    keys = predefinedOrder;
  } else if (data && data.length > 0) {
    keys = Object.keys(data[0]);
  }

  const dynamicColumns: GridColDef[] = keys.map((key) => ({
    field: key,
    headerName: getCustomHeader(key),
    type: typeof data[0][key] === "number" ? "number" : "string",
    align: typeof data[0][key] === "number" ? "right" : "left",
    headerAlign: typeof data[0][key] === "number" ? "right" : "left",
    renderCell: (params) => (
      <CustomCellRender decimalPlaces={decimalPlaces} {...params} />
    ),
    minWidth: getMinWidth(key),
    cellClassName: (params) => {
      if (
        typeof params.value === "number" ||
        !isNaN(Date.parse(params.value))
      ) {
        return "tabular-font"; // Apply tabular font class for numbers and dates
      }
      return "";
    },
  }));

  return (
    <TableContainer height={height}>
      <StyledDataGrid
        rows={data}
        rowHeight={40}
        disableRowSelectionOnClick
        rowCount={data.length}
        experimentalFeatures={{ columnGrouping: true }}
        loading={isLoading}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        columns={dynamicColumns}
        columnGroupingModel={columnGroupingModel}
        {...(showAllEntries
          ? {
              hideFooterPagination: true,
            }
          : { pagination: true, pageSizeOptions: [25, 50, 100] })}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </TableContainer>
  );
};

export default DataTable;
