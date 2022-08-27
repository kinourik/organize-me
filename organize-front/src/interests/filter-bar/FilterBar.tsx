
import { useState } from "react";
import "./FilterBar.css";
import CreateInterestPopup from "./popups/CreateInterestPopup";
import FilterPopup from "./popups/FilterPopup";
import TagNameType from "./TagNameType";

const FilterBar: React.FC = () => {
  let [showPopup, setShowPopup] = useState<{filter:boolean, interest:boolean}>({filter:false, interest:false})
  const handleShowFilterPopup = () =>{
    setShowPopup({interest: showPopup.interest, filter: !showPopup.filter})
  }
  const handleShowInterestPopup = () =>{
    setShowPopup({interest: !showPopup.interest, filter: showPopup.filter})
  }
  return (
    <div className="FilterBar">
      <div className="SearchInterestName">
        <input type="text" className="InputName" placeholder="Type a name" />
        <button
          className="ButtonFilter"
          type="button"
          onClick={() => handleShowInterestPopup()}>
          +
        </button>
      </div>
      <div className="FilterSection">
        <div className="FilterLabelButton">
          <span className="FilterLabel">Filters:</span>
          <span className="AddFilterButton" onClick={() => handleShowFilterPopup()}> <b>+</b></span>
        </div>
        <div className="FiltersList">
          <TagNameType name="Ongoing" category="S"/>
          <TagNameType name="Nearby" category="S"/>
          <TagNameType name="Anime" category="T"/>
          <TagNameType name="Manga" category="T"/>
          <TagNameType name="Movie" category="T"/>
          <TagNameType name="Playlist" category="T"/>
          <TagNameType name="All" category="G"/>
        </div>
      </div>
      {
        showPopup.filter?  
        <FilterPopup  
          closePopup={handleShowFilterPopup}  
        />  
        : null  
      }
      {
        showPopup.interest?  
        <CreateInterestPopup  
          closePopup={handleShowInterestPopup}  
        />  
        : null  
      }
    </div>
  );
};

export default FilterBar;
