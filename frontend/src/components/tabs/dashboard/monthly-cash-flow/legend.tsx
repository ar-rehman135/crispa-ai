import { Dot, TextContainer, LegendContainer } from "./index.styles";

const Legend = () => {
  return (
    <LegendContainer>
      <TextContainer
        color="#728BBE"
        style={{ borderRight: "1px solid #E4E5F1" }}
      >
        <Dot color="#728BBE" />
        <div>Net .</div>
      </TextContainer>
      <TextContainer
        color="#44D799"
        style={{ borderRight: "1px solid #E4E5F1" }}
      >
        <Dot color="#44D799" />
        <div>Inflow </div>
      </TextContainer>
      <TextContainer color="#EC55CB">
        <Dot color="#EC55CB" />
        <div>Outflow </div>
      </TextContainer>
    </LegendContainer>
  );
};

export default Legend;
