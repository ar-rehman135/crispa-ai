import React from "react";
import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { TableContainer, StyledDataGrid } from "./index.styles";

interface IDataTables {
  columns: GridColDef[];
  data: any[];
  isLoading: boolean;
  columnGroupingModel?: GridColumnGroupingModel;
  height?: string | number;
}

const DataTable: React.FC<IDataTables> = ({
  columns,
  data,
  isLoading,
  columnGroupingModel,
  height = 700,
}) => {
  return (
    <TableContainer height={height}>
      <StyledDataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        rowCount={data.length}
        experimentalFeatures={{ columnGrouping: true }}
        pagination
        loading={isLoading}
        pageSizeOptions={[25, 50, 100]} // Default page options
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        columnGroupingModel={columnGroupingModel}
      />
    </TableContainer>
  );
};

export default DataTable;
