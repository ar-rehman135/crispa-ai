import styled from "@emotion/styled";
import { Button, Card } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import { ITheme } from "theme/types";

export const ChartContainer = styled("div")<ITheme>`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 16px;
  padding: 20px;
  .custom-tooltip {
    background-color: ${({ theme }) => theme.palette.common.black};
    color: white;
    padding: 10px 15px;
    width: 250px;
    border-radius: 10px;
  }
  .blue-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.secondary[300]};
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
    background: ${({ theme }) => theme.palette.secondary[200]};
  }
  .pink-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.secondary[800]};
  }
  .icon-reverse {
    position: absolute;
    right: 0px;
    top: 5px;
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
  margin-right: 30px;
`;

export const StartingMonth = styled("h4")<ITheme>`
  color: ${({ theme }) => theme.palette.secondary[800]};
  font-size: 16px;
  font-weight: 700;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  text-decoration: none !important;
`;

export const SearchInput = styled.input<ITheme>`
  width: 200px;
  border-radius: 6px;
  font-size: 14px !important;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.palette.grey[500]}!important;
  :focus {
    border: 1px solid ${({ theme }) => theme.palette.grey[500]}!important;
    outline: 1px solid ${({ theme }) => theme.palette.grey[500]} !important;
  }
  margin-left: 20px;
  margin-right: 20px;
`;

export const DateInput = styled(ReactDatePicker)<ITheme>`
  border: 1px solid ${({ theme }) => theme.palette.grey[500]}
  border-radius: 6px;
  font-size: 14px !important;
  padding: 10px !important;
  outline: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
  margin-left: 20px;
`;

export const UpdateButton = styled(Button)<ITheme>`
  background-color: ${({ theme }) => theme.palette.secondary[300]} !important;
  width: 100px;
  text-transform: none !important;
  color: ${({ theme }) => theme.palette.info[300]} !important;
  border: 2px solid ${({ theme }) => theme.palette.warning[200]} !important;
  border-radius: 8px !important;
`;

export const TableContainer = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 16px;
`;
