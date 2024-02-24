import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { TableContainer, StyledDataGrid } from "./index.styles";

interface IDataTables {
  columns: GridColDef[];
  data: any[];
  isLoading: boolean;
}

const DataTable: React.FC<IDataTables> = ({ columns, data, isLoading }) => {
  return (
    <TableContainer>
      <StyledDataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        rowCount={data.length}
        pagination
        loading={isLoading}
        pageSizeOptions={[50, 100, 200]} // Default page options
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </TableContainer>
  );
};

export default DataTable;
