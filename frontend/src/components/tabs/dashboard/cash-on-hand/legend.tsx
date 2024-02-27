import {
  ActualLine,
  TextContainer,
  LegendContainer,
  ScenarioLine,
  RunwayText,
} from "./index.styles";
import { COLORS } from "colors";

const Legend = () => {
  return (
    <LegendContainer>
      <TextContainer color={COLORS.secondary?.[500]}>
        <ActualLine />
        <div>Actuals</div>
      </TextContainer>
      <TextContainer color={COLORS.secondary?.[400]}>
        <div className="legend-flex">
          <ScenarioLine color={COLORS.secondary?.[400]} />
          <ScenarioLine color={COLORS.secondary?.[400]} />
          <ScenarioLine color={COLORS.secondary?.[400]} />
          <div>
            <div style={{ marginTop: "1rem" }}>Scenario A</div>
            <div>
              <RunwayText color={COLORS.grey?.[700]}>Runway: 12 months</RunwayText>
            </div>
          </div>
        </div>
      </TextContainer>
      <TextContainer color={COLORS.secondary?.[400]}>
        <div className="legend-flex">
          <ScenarioLine color={COLORS.secondary?.[400]}/>
          <ScenarioLine color={COLORS.secondary?.[400]} />
          <ScenarioLine color={COLORS.secondary?.[400]}/>
          <div>
            <div style={{ marginTop: "1rem" }}>Scenario B</div>
            <div>
              <RunwayText color={COLORS.grey?.[700]}>Runway: 24 months</RunwayText>
            </div>
          </div>
        </div>
      </TextContainer>
    </LegendContainer>
  );
};

export default Legend;
