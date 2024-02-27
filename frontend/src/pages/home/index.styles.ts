import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { ITheme } from "theme/types";

export const StyledTabsContainer = styled(Box)<ITheme>`
  width: 100%;
  .tab {
    font-size: 16px;
    text-transform: none !important;
    color: ${({ theme }) => theme.palette.grey[100]}; !important;
  }
  .Mui-selected {
    border: none;
    color: ${({ theme }) => theme.palette.secondary[300]} !important;
    border-bottom: 4px solid ${({ theme }) =>
      theme.palette.secondary[300]} !important;
  }
  MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary {
    color: ${({ theme }) => theme.palette.common.white} !important;
  }
  .tabs {
    color: ${({ theme }) => theme.palette.grey[100]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
    margin-top: -10px;
  }
`;

export const StyledTabsWrapper = styled(Box)<ITheme>`
  width: max-content;
`;
