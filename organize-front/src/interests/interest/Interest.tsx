import "./Interest.css";
import { InterestType, getStyleFromState, getStyleFromType, getProgress, getQtaType } from "./InterestUtils";


export const Interest: React.FC<InterestType> = (interest) => {

  

  return (
    <div className="Interest">
      <div className="InterestStateNumber">
        <div
          className="InterestState"
          style={getStyleFromState(interest.state)}
        ></div>
        <div className="InterestNumber">{interest.number}.</div>
      </div>
      <div className="InterestName">{interest.name}</div>
      <div className="InterestType">
        <span className="InterestTypeText" style={getStyleFromType(interest.type)}>{interest.type}</span>
      </div>
      <div className="InterestScore">{interest.score? interest.score: "-"}</div>
      <div className="InterestProgress">
        <span style={{ marginLeft: 0, marginRight: "auto" }}>
          {getProgress(interest)}
        </span>
        <span style={{ marginLeft: "auto", marginRight: 0 }}>
          {getQtaType(interest.type)}
        </span>
      </div>
    </div>
  );
};

