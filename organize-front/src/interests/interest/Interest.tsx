import { useState } from "react";
import "./Interest.css";
import InterestDetailPopup, { InterestDto } from "./InterestDetailPopup";
import { InterestType, getStyleFromState, getStyleFromType, getProgress, getQtaType } from "./InterestUtils";


export const Interest: React.FC<InterestType> = (interest) => {
  const [showDetail, setShowDetail] = useState(false)
  const handleShowInterestDetailPopup = ()=>{
    setShowDetail(!showDetail)
  }

  const [interestDto, setInterestDto] = useState<InterestType>(interest) 

  const updateInterestFromDto = (dto:InterestDto) =>{
    if(dto.state)  {
      setInterestDto((currentInterest)=> {
        return {...currentInterest, state: dto.state?dto.state:""}
      })
    }
    if(dto.score){
      setInterestDto((currentInterest)=> {
        return {...currentInterest, score: dto.score?dto.score:0}
      })
    }
    if(dto.currently){
      setInterestDto((currentInterest)=> {
        return {...currentInterest, currently: dto.currently?dto.currently:0}
      })
    }
    if(dto.total){
      setInterestDto((currentInterest)=> {
        return {...currentInterest, total: dto.total?dto.total:0}
      })
    }
  }
  return (
    <div className="Interest">
      <div className="InterestStateNumber">
        <div
          className="InterestState"
          style={getStyleFromState(interestDto.state)}
        ></div>
        <div className="InterestNumber">{interest.number}.</div>
      </div>
      <div className="InterestName" onClick={() => handleShowInterestDetailPopup()}>{interestDto.name}</div>
      <div className="InterestType">
        <span className="InterestTypeText" style={getStyleFromType(interestDto.type)}>{interestDto.type}</span>
      </div>
      <div className="InterestScore">{interestDto.score? interestDto.score: "-"}</div>
      <div className="InterestProgress">
        <span style={{ marginLeft: 0, marginRight: "auto" }}>
          {getProgress(interestDto)}
        </span>
        <span style={{ marginLeft: "auto", marginRight: 0 }}>
          {getQtaType(interestDto.type)}
        </span>
      </div>
    {showDetail ? (
      <InterestDetailPopup
        closePopup={handleShowInterestDetailPopup}
        interestId={interest.id as string}
        updateInterestDto={updateInterestFromDto}
        removeFromInterestList={interest.removeItself}
      />
    ) : null}
    </div>
  );
};

