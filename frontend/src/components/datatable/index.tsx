import React from "react";
import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { TableContainer, StyledDataGrid } from "./index.styles";

interface IDataTables {
  columns: GridColDef[];
  data: any[];
  isLoading: boolean;
  columnGroupingModel?: GridColumnGroupingModel;
  height?: string | number;
  decimalPlaces?: number;
  showAllEntries?: boolean;
}

const DataTable: React.FC<IDataTables> = ({
  columns,
  data,
  isLoading,
  columnGroupingModel,
  height = 700,
  decimalPlaces = 2,
  showAllEntries = false,
}) => {
  // Render cell with formatted monetary values
  const renderCell = (params: any) => {
    const value = params.value;
    const formattedValue =
      typeof value === "number" ? value.toFixed(decimalPlaces) : value;
    return <div>{formattedValue}</div>;
  };

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
        columns={columns.map((col) => ({
          ...col,
          renderCell: col.renderCell || renderCell,
        }))}
        columnGroupingModel={columnGroupingModel}
        {...(showAllEntries
          ? {
              hideFooterPagination: true,
            }
          : { pagination: true, pageSizeOptions: [25, 50, 100] })}
      />
    </TableContainer>
  );
};

export default DataTable;
