
import { useEffect, useState } from "react";
import { idText } from "typescript";
import "./FilterBar.css";
import CreateInterestPopup from "./popups/CreateInterestPopup";
import FilterPopup from "./popups/FilterPopup";
import TagNameType, { TagNTNode } from "./TagNameType";

const FilterBar: React.FC = () => {
  let [showPopup, setShowPopup] = useState<{filter:boolean, interest:boolean}>({filter:false, interest:false})
  const handleShowFilterPopup = () =>{
    setShowPopup({interest: showPopup.interest, filter: !showPopup.filter})
  }
  const handleShowInterestPopup = () =>{
    setShowPopup({interest: !showPopup.interest, filter: showPopup.filter})
  }
  const handleRemoveItem = (name:string, category:string) => {
    updateFilterList(filterList.filter(item => item.name !== name || item.category!==category));
  };


  const defaultFilterList: {name:string, category:string}[] = [
    { name: "All", category: "S" },
    { name: "All", category: "T" },
    { name: "All", category: "G"}
  ];

  const [filterList, updateFilterList] = useState(defaultFilterList);

  useEffect(()=>{
    ["S","T","G"].forEach(category =>{
      if(filterList.filter(item => item.category===category).length==0){
        updateFilterList([...filterList, { name: "All", category: category }])
      }
    })
  },[filterList])

  

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
          {
          filterList.map((filter) =>{
             return <TagNameType name={filter.name} category={filter.category} handleRemove={handleRemoveItem}/>
          })
          }
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
