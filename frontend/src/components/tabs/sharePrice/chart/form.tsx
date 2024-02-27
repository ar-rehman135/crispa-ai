import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector, setMonthRange, setStockName } from "store/app";
import { useStockPrice } from "hooks/useStockPrice";

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
import { calculateMonthsDifference, calculateMonthsBack } from "utils";

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
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0942 3.07222H10.8623V2.45627C10.8623 2.29292 10.7974 2.13625 10.6819 2.02074C10.5664 1.90523 10.4097 1.84033 10.2464 1.84033C10.083 1.84033 9.92633 1.90523 9.81082 2.02074C9.69531 2.13625 9.63041 2.29292 9.63041 2.45627V3.07222H5.93476V2.45627C5.93476 2.29292 5.86987 2.13625 5.75436 2.02074C5.63885 1.90523 5.48218 1.84033 5.31882 1.84033C5.15546 1.84033 4.9988 1.90523 4.88328 2.02074C4.76777 2.13625 4.70288 2.29292 4.70288 2.45627V3.07222H3.47099C2.98092 3.07222 2.51092 3.2669 2.16438 3.61343C1.81785 3.95997 1.62317 4.42997 1.62317 4.92004V12.3113C1.62317 12.8014 1.81785 13.2714 2.16438 13.618C2.51092 13.9645 2.98092 14.1592 3.47099 14.1592H12.0942C12.5843 14.1592 13.0543 13.9645 13.4008 13.618C13.7473 13.2714 13.942 12.8014 13.942 12.3113V4.92004C13.942 4.42997 13.7473 3.95997 13.4008 3.61343C13.0543 3.2669 12.5843 3.07222 12.0942 3.07222V3.07222ZM12.7101 12.3113C12.7101 12.4747 12.6452 12.6314 12.5297 12.7469C12.4142 12.8624 12.2575 12.9273 12.0942 12.9273H3.47099C3.30764 12.9273 3.15097 12.8624 3.03546 12.7469C2.91995 12.6314 2.85505 12.4747 2.85505 12.3113V7.99975H12.7101V12.3113ZM12.7101 6.76787H2.85505V4.92004C2.85505 4.75668 2.91995 4.60002 3.03546 4.48451C3.15097 4.36899 3.30764 4.3041 3.47099 4.3041H4.70288V4.92004C4.70288 5.0834 4.76777 5.24007 4.88328 5.35558C4.9988 5.47109 5.15546 5.53598 5.31882 5.53598C5.48218 5.53598 5.63885 5.47109 5.75436 5.35558C5.86987 5.24007 5.93476 5.0834 5.93476 4.92004V4.3041H9.63041V4.92004C9.63041 5.0834 9.69531 5.24007 9.81082 5.35558C9.92633 5.47109 10.083 5.53598 10.2464 5.53598C10.4097 5.53598 10.5664 5.47109 10.6819 5.35558C10.7974 5.24007 10.8623 5.0834 10.8623 4.92004V4.3041H12.0942C12.2575 4.3041 12.4142 4.36899 12.5297 4.48451C12.6452 4.60002 12.7101 4.75668 12.7101 4.92004V6.76787Z"
                fill="#57E9E0"
              />
            </svg>
          }
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
