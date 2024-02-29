import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

import { ITheme } from "theme/types";

export const StyledDataGrid = styled(DataGrid)<ITheme>(({ theme }) => ({
  border: "none !important",

  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: theme.palette.info[400],
    },
  },

  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.info[500],
    "&:hover": {
      backgroundColor: theme.palette.info[400],
    },
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    color: theme.palette.grey[300],
    fontWeight: "bolder",
    fontSize: "16px",
    textTransform: "uppercase",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    width: "0.4em",
    height: "0.4em",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
    background: theme.palette.background.default,
    borderRadius: "7px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[300],
    borderRadius: "10px",
  },
  "& .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer":
    {
      display: "flex",
      borderWidth: "2px",
      justifyContent: "center",
      color: theme.palette.grey[300],
    },

  "& .MuiDataGrid-columnHeader--filledGroup:nth-child(4) .MuiDataGrid-columnHeaderTitleContainer":
    {
      borderColor: theme.palette.secondary[200],
    },

  "& .MuiDataGrid-columnHeader--filledGroup:nth-child(2) .MuiDataGrid-columnHeaderTitleContainer":
    {
      borderColor: theme.palette.secondary[300],
    },
  "& .MuiCircularProgress-svg": {
    color: theme.palette.primary.main,
  },
  "& .MuiDataGrid-cell--withRenderer": {
    textTransform: "capitalize",
  },
}));

export const TableContainer = styled(Grid)<ITheme>(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.background.default,
  margin: "1rem",
  borderRadius: "8px",
  overflow: "none",
  ".tabular-font": {
    fontFamily: "Courier New, Courier, monospace !important",
  },
}));
