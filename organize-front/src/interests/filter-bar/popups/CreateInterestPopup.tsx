import { SrvRecord } from "dns";
import { useEffect, useState } from "react";
import { getAndSetPetition } from "../../../api/Petition";
import "./CreateInterestPopup.css";

interface CreateInterestPopupProps {
  closePopup: () => void;
}

const CreateInterestPopup: React.FC<CreateInterestPopupProps> = ({
  closePopup,
}) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [currently, setCurrently] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [content, setContent] = useState<string | null>(null);

  const [types, setTypes] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  

  const handleChangeName = (event: React.ChangeEvent<{ value: unknown | string }>) =>{
    setName(event.target.value as string)
  }
  const handleChangeType = (event: React.ChangeEvent<{ value: unknown | string }>) =>{
    setType(event.target.value as string)
  }
  const handleChangeState = (event: React.ChangeEvent<{ value: unknown | string }>) =>{
    setState(event.target.value as string)
  }
  const handleChangeGenre = (event: React.ChangeEvent<{ value: unknown | string }>) =>{
    setGenre(event.target.value as string)
  }
  const handleChangeScore = (event: React.ChangeEvent<{ value: unknown | number }>) =>{
    setScore(event.target.value as number)
  }
  const handleChangeCurrently = (event: React.ChangeEvent<{ value: unknown | number }>) =>{
    setCurrently(event.target.value as number)
  }
  const handleChangeTotal = (event: React.ChangeEvent<{ value: unknown | number }>) =>{
    setTotal(event.target.value as number)
  }
  const handleChangeContent = (event: React.ChangeEvent<{ value: unknown | string }>) =>{
    setContent(event.target.value as string)
  }

  useEffect(()=>{
    getAndSetPetition("/interests/states", setStates)
    getAndSetPetition("/interests/types", setTypes)
    getAndSetPetition("/interests/genres", setGenres)
  },[])

  return (
    <div className="CreateInterestPopup">
      <div className="CreateInterestOpen">
        <div className="Title">
          <h3 style={{ paddingLeft: "15px" }}>Create interest</h3>
          <span
            className="ClosePopupButton"
            onClick={() => closePopup()}
            style={{ fontFamily: "sans-serif" }}
          >
            {" "}
            <b>x</b>
          </span>
        </div>
        <div className="CInterestName">
          <input
            type="text"
            className="InputInterestCreate"
            value={name}
            onChange={handleChangeName}
            placeholder="Type the name"
            title="Name"
          />
        </div>
        <div className="CInterestStateTypeGenres">
          <label className="DarkSelect" title="State">
            <select 
            value={state}
            onChange={handleChangeState}>
              <option value="Select" selected hidden>
                Select the state
              </option>
              {states.map((item)=>{
              return <option value={item}>{item}</option>
            })}
            </select>
          </label>
          <label className="DarkSelect" title="Type">
            <select 
              value={type}
              onChange={handleChangeType}>
              <option value="Select" selected hidden>
                Select the type
              </option>
              {types.map((item)=>{
              return <option value={item}>{item}</option>
            })}
            </select>
          </label>
          <label className="DarkSelect" title="Genre">
            <select 
            value={genre}
            onChange={handleChangeGenre}>
              <option value="Select" selected hidden>
                Select the genre
              </option>
              {genres.map((item)=>{
              return <option value={item}>{item}</option>
              })}
            </select>
          </label>
        </div>
        <div className="CInterestContent">
          <input
            type="text"
            className="InputInterestCreate"
            value={content as string}
            onChange={handleChangeContent}
            placeholder="Type the access content"
            title="Content"
          />
        </div>
        <div className="CInterestScoreCurrentlyTotalCreate">
          <input
            type="text"
            className="InputInterestCreate"

            value={score as number}
            onChange={handleChangeScore}
            placeholder="Type a score"
            title="Score"
          />
          <input
            type="text"
            className="InputInterestCreate"

            value={currently as number}
            onChange={handleChangeCurrently}
            placeholder="Type progress"
            title="Progress"
          />
          <input
            type="text"
            className="InputInterestCreate"

            value={total as number}
            onChange={handleChangeTotal}
            placeholder="Type total"
            title="Total"
          />
          <button className="ButtonFilter" type="button">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInterestPopup;
