import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "hooks/useReduxTypedHooks";
import {
  getAppDataSelector,
  setMonthRange,
  setStockName,
  setStockPriceData,
} from "store/app";
import { useStockPrice } from "hooks/useStockPrice";
import { ReactComponent as CalendarIcon } from "assets/calendar.svg";

import {
  calculateMonthsDifference,
  calculateMonthsBack,
  transformStockData,
} from "utils";

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
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const stock = watch("stockName");
  const timeRange = watch("timeRange");

  // Set initial values for the form fields
  useEffect(() => {
    setValue("timeRange", calculateMonthsBack(monthRange));
    setValue("stockName", stockName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const numberOfMonths = calculateMonthsDifference(timeRange);

  const onSuccess = (data: any) => {
    setIsUpdate(false);
    if (data["Meta Data"]) {
      // number of months of data to show on graph
      const transformedData = transformStockData(data, numberOfMonths);
      dispatch(setStockPriceData(transformedData));
    } else if (data["Error Message"]) {
      toast.error(data["Error Message"]);
    }
  };

  const onError = (error: Error | any) => {
    setIsUpdate(false);
    toast.error(
      error instanceof Error
        ? error.message
        : "Error fetching entry list table data"
    );
  };

  const { isLoading, fetchStockData } = useStockPrice({
    stockName: stock,
    onSuccess,
    onError,
    enabledOnMount: false,
  });

  const handleUpdateButtonClick = async () => {
    setIsUpdate(true);
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
          disabled={isUpdate && isLoading}
        >
          {isUpdate && isLoading ? <CircularProgress size={20} /> : "Update"}
        </UpdateButton>
      </SearchContainer>
    </TableHeader>
  );
};

export default PriceForm;
