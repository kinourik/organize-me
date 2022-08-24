import { useState } from "react";
import "./FilterForm.css";

const FilterForm: React.FC = () => {
  let [states, setStates] = useState<string[]>([]);
  let [types, setTypes] = useState<string[]>([]);
  let [genres, setGenres] = useState<string[]>([]);
  let [name, setName] = useState<string>("");

  return (
    <div className="SearchInterestName">
      <form>
        <input type="text" className="InputName" placeholder="Type a name" />
        <button className="ButtonFilter" type="submit">
          {" "}
          Filter{" "}
        </button>
      </form>
        <button
          className="ButtonFilter"
          type="button"
          style={{ paddingLeft: "11px", paddingRight: "11px"    
        }}
        >
          {" "}
          +{" "}
        </button>
    </div>
  );
};

export default FilterForm;
