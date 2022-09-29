import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { deletePetition, getAndSetPetition, getListAndSetPetition, putPetition } from "../../api/Petition";
import "./InterestDetailPopup.css";
import { getStyleFromType } from "./InterestUtils";
interface InterestDetailPopupProps {
  closePopup: () => void;
  interestId: string;
  updateInterestDto: (interes:InterestDto) => void;
  removeFromInterestList: (id: string) =>void
}

export interface InterestDto{
  id?: string;
  number?: number;
  name?: string;
  type?: string;
  state?: string;
  genres?: string[];
  score?: number;
  currently?: number;
  total?: number;
  content?: string;
}

const InterestDetailPopup: React.FC<InterestDetailPopupProps> = ({
  closePopup, interestId, updateInterestDto, removeFromInterestList
}) => {
  const [interest, setInterest] = useState<InterestDto | null>(null)
  
  const [states, setStates] = useState<string[]>([]);
  const [genresList, setGenresList] = useState<string[]>([]);

  const updateInterest = (body: InterestDto)=>{
    putPetition("/interests/"+interestId, body)
    .then((response)=>{
      setInterest((currentInterest)=> {
        return {...currentInterest, ...body}
      })
      updateInterestDto(body)
    }).catch((error: AxiosError)=>
      console.error(error.cause)
    )
  }
  const handleChangeState = (
    event: React.ChangeEvent<{ value: unknown | string }>
  ) => {
    updateInterest({state: event.target.value as string})
  };
  const handleChangeGenre = (
    event: React.ChangeEvent<{ value: unknown | string }>
  ) => {
    updateInterest({genres: [event.target.value as string]})
  };
  const handleChangeScore = (
    event: React.ChangeEvent<{ value: unknown | number }>
  ) => {
    updateInterest({score: event.target.value as number})
  };
  const handleChangeCurrently = (
    event: React.ChangeEvent<{ value: unknown | number }>
  ) => {
    updateInterest({currently: event.target.value as number})
  };
  const handleChangeTotal = (
    event: React.ChangeEvent<{ value: unknown | number }>
  ) => {
    updateInterest({total: event.target.value as number})
  };
  const handleChangeContent = (
    event: React.ChangeEvent<{ value: unknown | string }>
  ) => {
    updateInterest({content: event.target.value as string})
  };

  const handleDeleteInterest = () =>{
    deletePetition("/interests/"+interestId).then((response)=>{
      removeFromInterestList(interestId)
      closePopup()
    }).catch((error: AxiosError)=>console.error(error.cause))
  }

  useEffect(() => {
    getAndSetPetition("/interests/"+interestId, setInterest)
    getListAndSetPetition("/interests/states", setStates);
    getListAndSetPetition("/interests/genres", setGenresList);
  }, [interestId]);

  return (
    <div className="InterestDetailPopup">
      <div className="InterestDetailOpen">
        <div className="Title">
          <div style={{paddingTop: "15px"}}>
          <span className="CInterestDetailName">{interest?.name}</span>
          <span className="InterestTypeText" style={getStyleFromType(interest?.type as string)}>{interest?.type}</span>
          </div>
          
        
          <span
            className="ClosePopupButton"
            onClick={() => closePopup()}
            style={{ fontFamily: "sans-serif" }}
          >
            {" "}
            <b>x</b>
          </span>
        </div>
        
        <div className="CInterestDetailStateGenres">
          
          <label className="DarkSelect" title="State">
            <select value={interest?interest.state:""} onChange={handleChangeState}>
              <option value="Select" selected hidden>
                Select the state
              </option>
              {states.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </label>
          
          <label className="DarkSelect" title="Genre">
            <select value={(interest?.genres as string[])?(interest?.genres as string[])[0]:""} onChange={handleChangeGenre}>
              <option value="Select" selected hidden>
                Select the genre
              </option>
              {genresList.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </label>
        </div>
        <div className="CInterestDetailContent">
          <input
            type="text"
            className="InputInterestDetail"
            value={interest?.content as string}
            onChange={handleChangeContent}
            placeholder="Type the access content"
            title="Content"
          />
        </div>
        <div className="CInterestDetailScoreCurrentlyTotalDelete">
          <input
            type="text"
            className="InputInterestDetail"
            value={interest?.score as number}
            onChange={handleChangeScore}
            placeholder="Type a score"
            title="Score"
          />
          <input
            type="text"
            className="InputInterestDetail"
            value={interest?.currently as number}
            onChange={handleChangeCurrently}
            placeholder="Type progress"
            title="Progress"
          />
          <input
            type="text"
            className="InputInterestDetail"
            value={interest?.total as number}
            onChange={handleChangeTotal}
            placeholder="Type total"
            title="Total"
          />
          <button
            className="ButtonDelete"
            type="button"
            onClick={() => handleDeleteInterest()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestDetailPopup;
