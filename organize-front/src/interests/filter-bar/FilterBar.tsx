import "./FilterBar.css";
import FilterForm from "./form/FilterForm";

const FilterBar: React.FC = () => {
  return (
    <div className="FilterBar">
      <FilterForm />
      <div className="StateFilter"></div>
      <div className="TypeFilter"></div>
      <div className="GenresFilter"></div>
    </div>
  );
};

export default FilterBar;
