
import FilterBar from "../filter-bar/FilterBar";
import InterestsList from "../interests-list/InterestsList";

const InterestsPage: React.FC = () => {
  return (
    <div className="InterestsPage">
      <FilterBar />
      <InterestsList />
    </div>
  );
}

export default InterestsPage;