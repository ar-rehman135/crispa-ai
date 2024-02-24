import {
  ActualLine,
  TextContainer,
  LegendContainer,
  ScenarioLine,
  RunwayText,
} from "./index.styles";

const Legend = () => {
  return (
    <LegendContainer>
      <TextContainer color="#536DFE">
        <ActualLine />
        <div>Actuals</div>
      </TextContainer>
      <TextContainer color="#728BBE">
        <div className="legend-flex">
          <ScenarioLine color="#728BBE" />
          <ScenarioLine color="#728BBE" />
          <ScenarioLine color="#728BBE" />
          <div>
            <div style={{ marginTop: "1rem" }}>Scenario A</div>
            <div>
              <RunwayText color="#738294">Runway: 12 months</RunwayText>
            </div>
          </div>
        </div>
      </TextContainer>
      <TextContainer color="#728BBE">
        <div className="legend-flex">
          <ScenarioLine color="#728BBE" />
          <ScenarioLine color="#728BBE" />
          <ScenarioLine color="#728BBE" />
          <div>
            <div style={{ marginTop: "1rem" }}>Scenario B</div>
            <div>
              <RunwayText color="#738294">Runway: 24 months</RunwayText>
            </div>
          </div>
        </div>
      </TextContainer>
    </LegendContainer>
  );
};

export default Legend;
