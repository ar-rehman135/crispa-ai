import React from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { getChipColors } from "utils";
import { CustomChip } from "components/chip";

interface ICustomCellRenderer extends GridCellParams {
  decimalPlaces?: number;
}

const CustomCellRender: React.FC<ICustomCellRenderer> = ({
  field,
  value,
  decimalPlaces,
}) => {
  switch (field) {
    case "status":
    case "movement":
    case "reconciled": {
      const label = (value as string).toUpperCase();
      const { backgroundColor, textColor } = getChipColors(label);
      return (
        <CustomChip
          label={label}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      );
    }
  }

  const isNumeric = typeof value === "number";
  if (isNumeric) {
    const formattedValue = value.toFixed(decimalPlaces);
    return <div>{formattedValue}</div>;
  }

  return <>{value}</>;
};

export default CustomCellRender;
