import { StyledChip } from "./index.styles";

interface ICustomChip {
  label: string;
  textColor: string;
  backgroundColor: string;
}

export const CustomChip = ({
  label,
  textColor,
  backgroundColor,
}: ICustomChip) => {
  return (
    <StyledChip
      label={label}
      variant="filled"
      style={{
        color: textColor,
        backgroundColor,
      }}
    />
  );
};
