import styled from "@emotion/styled";
import { Chip } from "@mui/material";

import { ITheme } from "theme/types";

export const StyledChip = styled(Chip)<ITheme>(({ theme }) => ({
  borderRadius: 5,
  fontWeight: "bolder",
  height: 20,
}));
