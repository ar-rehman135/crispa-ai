import styled from "@emotion/styled";
import { Stack } from "@mui/material";

import { COLORS } from "colors";

export const ChartContainer = styled("div")`
  margin-top: 20px;
  background-color: ${COLORS.WHITE};
  border-radius: 16px;
  padding: 20px;
  .custom-tooltip {
    background-color: ${COLORS.BLACK};
    color: ${COLORS.WHITE};
    padding: 10px 15px;
    width: 250px;
    border-radius: 10px;
  }
  .green-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${COLORS.GREEN_100};
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
    background: ${COLORS.BLUE_700};
  }
  .pink-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${COLORS.PINK_100};
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

export const StyledSelect = styled.select({
  borderRadius: "20px !important", // Rounded borders
  height: "40px",
  fontSize: 14,
  padding: "0px 10px",
  border: `1px solid ${COLORS.GREEN_100} !important`,
  color: COLORS.BLUE_400,
  fontWeight: 700,
  ":focus": {
    border: `1px solid ${COLORS.GREEN_100} !important`,
  },
});

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
