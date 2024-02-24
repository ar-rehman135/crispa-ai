import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledTabsContainer = styled(Box)`
  width: 100%;
  .tab {
    font-size: 16px;
    text-transform: none !important;
    color: #9da3ae !important;
  }
  .css-1aquho2-MuiTabs-indicator {
    background-color: #57e9e0 !important;
  }
  .Mui-selected {
    color: #57e9e0 !important;
  }
  MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary {
    color: white !important;
  }
  .tabs {
    color: #9da3ae;
  }
`;

export const StyledTabsWrapper = styled(Box)`
  border-bottom: 1px solid #9da3ae;
  width: max-content;
`;
