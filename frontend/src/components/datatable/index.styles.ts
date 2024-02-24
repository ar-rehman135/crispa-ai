import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;

export const StyledDataGrid = styled(DataGrid)(({ theme }: any) => ({
  border: "none !important",

  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: theme.palette.grey[200],
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: " #666666",
    fontWeight: "bolder",
    fontSize: "16px",
    textTransform: "uppercase",
    borderBottom: "1px solid red",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    width: "0.4em",
    height: "0.4em",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
    background: "white",
    borderRadius: "7px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    backgroundColor: "#666666",
    borderRadius: "10px",
  },
  "& .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer":
    {
      display: "flex",
      borderWidth: "2px",
      justifyContent: "center",
      color: "rgba(102, 102, 102, 1)",
    },

  "& .MuiDataGrid-columnHeader--filledGroup:nth-child(4) .MuiDataGrid-columnHeaderTitleContainer":
    {
      borderColor: "rgba(78, 128, 238, 1)" /* Border color for child one */,
    },

  "& .MuiDataGrid-columnHeader--filledGroup:nth-child(2) .MuiDataGrid-columnHeaderTitleContainer":
    {
      borderColor: "rgba(87, 233, 224, 1)" /* Border color for child two */,
    },
    "& .MuiCircularProgress-svg":{
      color:"#252D46",
    }
}));

export const TableContainer = styled(Grid)`
  display: flex;
  background-color: white;
  margin: 1rem;
  border-radius: 8px 8px 0 0;
  height: 700px;
  overflow: none;
`;
