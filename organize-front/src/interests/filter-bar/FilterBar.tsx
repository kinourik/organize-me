import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./FilterBar.css";
import CreateInterestPopup from "./popups/CreateInterestPopup";
import FilterPopup from "./popups/FilterPopup";
import TagNameType, { TagNTNode } from "./TagNameType";

const FilterBar: React.FC<{
  filterList: { name: string; category: string }[];
  handleInterestNameChange: Dispatch<SetStateAction<string>>;
  updateFilterList: Dispatch<
    SetStateAction<{ name: string; category: string }[]>
  >;
}> = ({ filterList, updateFilterList, handleInterestNameChange }) => {
  let [showPopup, setShowPopup] = useState<{
    filter: boolean;
    interest: boolean;
  }>({ filter: false, interest: false });

  const [interestName, setInterestName] = useState<string>("");

  const handleShowFilterPopup = () => {
    setShowPopup({ interest: showPopup.interest, filter: !showPopup.filter });
  };
  const handleShowInterestPopup = () => {
    setShowPopup({ interest: !showPopup.interest, filter: showPopup.filter });
  };
  const handleRemoveItem = (name: string, category: string) => {
    updateFilterList(
      filterList.filter(
        (item) => item.name !== name || item.category !== category
      )
    );
  };
  const updateListAfterInterestCreation = (name: string)=>{
    setInterestName(name)
    handleInterestNameChange(name)
  }
  const handleAddItem = (name: string, category: string) => {
    const tempFilters = filterList.filter(
      (item) => item.name !== "All" || item.category !== category[0]
    );
    updateFilterList([...tempFilters, { name: name, category: category[0] }]);
  };

  const updateInterestName = (
    event: React.ChangeEvent<{ value: unknown | string }>
  ) => {
    setInterestName(event.target.value as string);
    if (interestName.length >= 3) {
      handleInterestNameChange(interestName);
    } else {
      handleInterestNameChange("");
    }
  };

  useEffect(() => {
    ["S", "T", "G"].forEach((category) => {
      if (filterList.filter((item) => item.category === category).length == 0) {
        updateFilterList([...filterList, { name: "All", category: category }]);
      }
    });
  }, [filterList]);

  return (
    <div className="FilterBar">
      <div className="SearchInterestName">
        <input
          type="text"
          className="InputName"
          value={interestName}
          onChange={updateInterestName}
          placeholder="Type a name"
        />
        <button
          className="ButtonFilter"
          type="button"
          onClick={() => handleShowInterestPopup()}
        >
          +
        </button>
      </div>
      <div className="FilterSection">
        <div className="FilterLabelButton">
          <span className="FilterLabel">Filters:</span>
          <span
            className="AddFilterButton"
            onClick={() => handleShowFilterPopup()}
          >
            {" "}
            <b>+</b>
          </span>
        </div>
        <div className="FiltersList">
          {filterList.map((filter) => {
            return (
              <TagNameType
                key={filter.name + "-" + filter.category}
                name={filter.name}
                category={filter.category}
                handleRemove={handleRemoveItem}
              />
            );
          })}
        </div>
      </div>
      {showPopup.filter ? (
        <FilterPopup
          closePopup={handleShowFilterPopup}
          addItem={handleAddItem}
        />
      ) : null}
      {showPopup.interest ? (
        <CreateInterestPopup closePopup={handleShowInterestPopup} updateListAtCreation={updateListAfterInterestCreation}/>
      ) : null}
    </div>
  );
};

export default FilterBar;
