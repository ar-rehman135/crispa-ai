import { COLORS } from "colors";
import { Dot, TextContainer, LegendContainer } from "./index.styles";

const Legend = () => {
  return (
    <LegendContainer>
      <TextContainer
        color={COLORS.BLUE_700}
        style={{ borderRight: `1px solid  ${COLORS.GREY_50} ` }}
      >
        <Dot color={COLORS.BLUE_700} />
        <div>Net .</div>
      </TextContainer>
      <TextContainer
        color={COLORS.GREEN_100}
        style={{ borderRight: `1px solid  ${COLORS.GREY_50} ` }}
      >
        <Dot color={COLORS.GREEN_100} />
        <div>Inflow </div>
      </TextContainer>
      <TextContainer color={COLORS.PINK_200}>
        <Dot color={COLORS.PINK_200} />
        <div>Outflow </div>
      </TextContainer>
    </LegendContainer>
  );
};

export default Legend;
