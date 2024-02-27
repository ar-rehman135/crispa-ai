import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector, setMonthRange, setStockName } from "store/app";
import { useStockPrice } from "hooks/useStockPrice";
import { ReactComponent as CalendarIcon } from "assets/calendar.svg";

import { calculateMonthsDifference, calculateMonthsBack } from "utils";
import { COLORS } from "colors";

import {
  StyledHeading,
  StyledSubHeading,
  TableHeader,
  SearchContainer,
  StartingMonth,
  SearchInput,
  DateInput,
  UpdateButton,
} from "./index.styles";

const PriceForm = () => {
  const dispatch = useAppDispatch();
  const { stockName, monthRange } = useAppSelector(getAppDataSelector);
  const { register, handleSubmit, setValue, watch } = useForm();
  const stock = watch("stockName");
  const timeRange = watch("timeRange");

  // Set initial values for the form fields
  useEffect(() => {
    setValue("timeRange", calculateMonthsBack(monthRange));
    setValue("stockName", stockName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const numberOfMonths = calculateMonthsDifference(timeRange);
  const { fetchStockData, isLoading } = useStockPrice(stock, numberOfMonths);

  const handleUpdateButtonClick = async () => {
    dispatch(setStockName(stock));
    dispatch(setMonthRange(numberOfMonths));
    await fetchStockData();
  };

  return (
    <TableHeader>
      <div>
        <StyledHeading>Share Price</StyledHeading>
        <StyledSubHeading>USD</StyledSubHeading>
      </div>
      <SearchContainer>
        <StartingMonth>Starting Month</StartingMonth>
        <DateInput
          onChange={(date) => {
            setValue("timeRange", date);
          }}
          showMonthYearPicker
          dateFormat="MMM YYYY"
          selected={timeRange}
          showIcon
          calendarIconClassname="icon-reverse"
          icon={<CalendarIcon />}
        />
        <SearchInput
          placeholder="Enter a stock symbol"
          {...register("stockName")}
        />
        <UpdateButton
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleUpdateButtonClick)}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : "Update"}
        </UpdateButton>
      </SearchContainer>
    </TableHeader>
  );
};

export default PriceForm;
