import { useState } from "react";
import "./FilterPopup.css";

interface FilterPopupProps{
  closePopup: () => void
}

const FilterPopup: React.FC<FilterPopupProps> = ({closePopup}) => {

  let [categoryType, setCategoryType] = useState<string | unknown>("")
  const handleCategoryTypeChange = (event: React.ChangeEvent<{ value: unknown }>) =>{
    setCategoryType(event.target.value)
  }
  let [categoryName, setCategoryName] = useState<string | unknown>("")
  const handleCategoryNameChange = (event: React.ChangeEvent<{ value: unknown }>) =>{
    setCategoryName(event.target.value)
  }

  return (
    <div className='FilterPopup'>  
      <div className='FilterPopupOpen'>  
        <label className="DarkSelect" >
          <select value={categoryType as string} onChange={handleCategoryTypeChange}>
            <option value="Select" selected hidden >Select a category</option>
            <option value="State">State</option>
            <option value="Type">Type</option>
            <option value="Genre">Genre</option>
          </select>
        </label>
        <label className="DarkSelect" >
          <select value={categoryName as string} onChange={handleCategoryNameChange}>
            <option value="Select" selected hidden>Select a name</option>
            <option value="op1">op1</option>
            <option value="op2">op2</option>
            <option value="op3">op3</option>
          </select>
        </label>
        <span className="AddCategoryButton" onClick={() => closePopup()}> <b>+</b></span>
        <span className="ClosePopupButton" onClick={() => closePopup()} style={{fontFamily: "sans-serif"}}> <b>x</b></span>
      </div>  
    </div> 
  );
};

export default FilterPopup;
