import styled from "@emotion/styled";
import { Button, Card } from "@mui/material";

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
`;

export const CustomCard = styled(Card)`
  border: none !important;
`;

export const ShareText = styled("h3")`
  font-size: 16px !important;
  font-weight: 700 !important;
  margin: 0 !important;
  padding: 10px 0 5px 10px !important;
`;

export const CurrencyText = styled("h3")`
  margin: 0 !important;
  font-size: 12px !important;
  padding: 0 0 0 10px !important;
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

export const TableHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 30px;
`;

export const StartingMonth = styled("h4")`
  color: #282828;
  font-size: 16px;
  font-weight: 700;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  text-decoration: none !important;
`;

export const SearchInput = styled.input`
  width: 200px;
  border-radius: 6px;
  font-size: 14px !important;
  padding: 12px;
  border: 1px solid #d8d5e2 !important;
  :focus {
    border: 1px solid #d8d5e2 !important;
    outline: 1px solid #d8d5e2 !important;
  }
`;

export const DateInput = styled.input`
  width: 200px;
  border: 1px solid #d8d5e2;
  border-radius: 6px;
  font-size: 14px !important;
  padding: 12px;
  outline: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
  ::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: block;
    background: url(https://i.ibb.co/5v8msJN/calendar-1.png) no-repeat;
    border-width: thin;
  }
`;

export const UpdateButton = styled(Button)`
  background-color: #57e9e0 !important;
  width: 100px;
  text-transform: none !important;
  color: #115c5e !important;
  border: 2px solid #2dd4cf !important;
  border-radius: 8px !important;
`;

export const TableContainer = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 16px;
`;
