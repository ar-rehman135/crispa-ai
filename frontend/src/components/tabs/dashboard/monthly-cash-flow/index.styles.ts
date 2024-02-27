import styled from "@emotion/styled";
import { Stack } from "@mui/material";

import { ITheme } from "theme/types";

export const ChartContainer = styled("div")<ITheme>`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 16px;
  padding: 20px;
  .custom-tooltip {
    background-color: ${({ theme }) => theme.palette.common.black};
    color: ${({ theme }) => theme.palette.common.white};
    padding: 10px 15px;
    width: 250px;
    border-radius: 10px;
  }
  .green-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.grey[500]};
  }
  .flex {
    display: flex;
    align-items: center;
    column-gap: 5px;
    justify-content: space-between;
  }
  .dark-blue-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.secondary[400]};
  }
  .pink-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.secondary[700]};
  }
  .icon-reverse {
    position: absolute;
    right: 0px;
    top: 5px;
  }
`;

export const StyledDivHeadingContainer = styled("div")`
  display: flex;
  column-gap: 20px;
`;

export const StyledHeading = styled.h2`
  font-weight: 800 !important;
  font-size: 15px;
  margin: 0px !important;
`;

export const StyledSubHeading = styled.h3`
  font-weight: 400 !important;
  font-size: 15px;
  margin: 0px !important;
`;

export const StyledSelect = styled.select<ITheme>(({ theme }) => ({
  borderRadius: "20px !important",
  height: "40px",
  fontSize: 14,
  padding: "0px 10px",
  border: `1px solid ${theme.palette.success.main} !important`,
  color: theme.palette.primary[400], 
  fontWeight: 700,
  ":focus": {
    border: `1px solid ${theme.palette.grey[500]} !important`,
  },
}));

export const LegendContainer = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  ".legend-flex": {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  cursor: "pointer",
}));

export const TextContainer = styled("div")(({ color }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  color,
  fontWeight: "bold",
  padding: "0px 20px",
}));

export const Dot = styled("div")(({ color }) => ({
  background: color,
  width: 8,
  height: 8,
  borderRadius: 10,
}));

export const ScenarioLine = styled("div")(({ color }) => ({
  width: 10,
  height: 5,
  background: color,
  borderRadius: 4,
}));

export const ScenarioTextContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));

export const RunwayText = styled("div")(({ color }) => ({
  fontSize: 12,
  fontWeight: 400,
  color,
}));
