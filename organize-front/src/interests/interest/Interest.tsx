import "./Interest.css";
import { InterestType, getStyleFromState, getStyleFromType, getProgress, getQtaType } from "./InterestUtils";


export const Interest: React.FC<InterestType> = (interest) => {

  let state = interest.state.charAt(0) + interest.state.substring(1, interest.state.length).toLowerCase()
  let type = interest.type.charAt(0) + interest.type.substring(1, interest.type.length).toLowerCase()
  

  return (
    <div className="Interest">
      <div className="InterestStateNumber">
        <div
          className="InterestState"
          style={getStyleFromState(state)}
        ></div>
        <div className="InterestNumber">{interest.number}.</div>
      </div>
      <div className="InterestName">{interest.name}</div>
      <div className="InterestType">
        <span className="InterestTypeText" style={getStyleFromType(type)}>{type}</span>
      </div>
      <div className="InterestScore">{interest.score? interest.score: "-"}</div>
      <div className="InterestProgress">
        <span style={{ marginLeft: 0, marginRight: "auto" }}>
          {getProgress(interest)}
        </span>
        <span style={{ marginLeft: "auto", marginRight: 0 }}>
          {getQtaType(type)}
        </span>
      </div>
    </div>
  );
};

