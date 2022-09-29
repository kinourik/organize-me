import { useState } from "react";
import { getListAndSetPetition } from "../../../api/Petition";
import "./FilterPopup.css";

interface FilterPopupProps {
  closePopup: () => void;
  addItem: (name: string, category: string) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ closePopup, addItem }) => {
  let [categoryType, setCategoryType] = useState<string | unknown>("");
  let [categoryName, setCategoryName] = useState<string | unknown>("");
  let [categoryNames, setCategoryNames] = useState<string[]>([]);

  const handleCategoryTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    let type: string | unknown = event.target.value as string;
    setCategoryType(type);
    if (type === "State") {
      getListAndSetPetition("/interests/states", setCategoryNames);
    } else if (type == "Type") {
      getListAndSetPetition("/interests/types", setCategoryNames);
    } else if (type == "Genre") {
      getListAndSetPetition("/interests/genres", setCategoryNames);
    }
  };

  const addFilterButtonHandler = () => {
    addItem(categoryName as string, categoryType as string);
    closePopup();
  };

  const handleCategoryNameChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategoryName(event.target.value);
  };
  return (
    <div className="FilterPopup">
      <div className="FilterPopupOpen">
        <label className="DarkSelect">
          <select
            value={categoryType as string}
            onChange={handleCategoryTypeChange}
          >
            <option value="Select" selected hidden>
              Select a category
            </option>
            <option value="State">State</option>
            <option value="Type">Type</option>
            <option value="Genre">Genre</option>
          </select>
        </label>
        <label className="DarkSelect">
          <select
            value={categoryName as string}
            onChange={handleCategoryNameChange}
          >
            <option value="Select" selected hidden>
              Select a name
            </option>
            {categoryNames.map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </label>
        <span className="AddCategoryButton" onClick={addFilterButtonHandler}>
          {" "}
          <b>+</b>
        </span>
        <span
          className="ClosePopupButton"
          onClick={() => closePopup()}
          style={{ fontFamily: "sans-serif" }}
        >
          {" "}
          <b>x</b>
        </span>
      </div>
    </div>
  );
};

export default FilterPopup;
