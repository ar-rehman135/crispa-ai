import { COLORS } from "colors";
import { Dot, TextContainer, LegendContainer } from "./index.styles";

const Legend = () => {
  return (
    <LegendContainer>
      <TextContainer
        color= {COLORS.secondary?.[400]}
        style={{ borderRight: `1px solid  ${COLORS.grey?.[600]} ` }}
      >
        <Dot color={COLORS.secondary?.[400]}/>
        <div>Net .</div>
      </TextContainer>
      <TextContainer
        color={COLORS.success?.[500]}
        style={{ borderRight: `1px solid  ${COLORS.grey?.[600]} ` }}
      >
        <Dot color={COLORS.success?.[500]} />
        <div>Inflow </div>
      </TextContainer>
      <TextContainer color={COLORS.secondary?.[800]}>
        <Dot color={COLORS.secondary?.[800]} />
        <div>Outflow </div>
      </TextContainer>
    </LegendContainer>
  );
};

export default Legend;
