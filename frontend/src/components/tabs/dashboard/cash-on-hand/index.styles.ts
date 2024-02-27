import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const ChartContainer = styled("div")`
  margin-top: 20px;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  .custom-tooltip {
    background-color: black;
    color: white;
    padding: 10px 15px;
    width: 250px;
    border-radius: 10px;
  }
  .blue-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #57e9e0;
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
    background: #4e80ee;
  }
  .pink-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ec55cb;
  }
  .icon-reverse {
    position: absolute;
    right: 0px;
    top: 5px;
  }
  .flex-cash {
  }
`;

export const CardWrapper = styled("div")`
  width: 100% !important;
`;

export const StyledHeading = styled.h2`
  font-weight: 800 !important;
  font-size: 20px;
  margin: 0px !important;
`;

export const StyledSubHeading = styled.h3`
  font-weight: 400 !important;
  font-size: 15px;
  margin: 0px !important;
`;

export const LegendContainer = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 40,
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
}));

export const ActualLine = styled("div")(() => ({
  background: "#536DFE",
  width: 30,
  height: 10,
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
