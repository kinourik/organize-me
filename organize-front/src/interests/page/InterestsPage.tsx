import { useEffect, useState } from "react";
import { buildInterestsPath, getAndSetPetition } from "../../api/Petition";
import FilterBar from "../filter-bar/FilterBar";
import { InterestType } from "../interest/InterestUtils";
import InterestsList from "../interests-list/InterestsList";

const InterestsPage: React.FC = () => {
  const defaultFilterList: { name: string; category: string }[] = [
    { name: "All", category: "S" },
    { name: "All", category: "T" },
    { name: "All", category: "G" },
  ];
  const [interests, setInterests] = useState<InterestType[]>([]);
  const [filterList, updateFilterList] = useState(defaultFilterList);
  const [interestName, setInterestName] = useState("")
  useEffect(() => {
    getAndSetPetition(buildInterestsPath({
      name: interestName,
      types: filterList.filter(filter=>filter.category==="T").map(filter=>filter.name),
      states: filterList.filter(filter=>filter.category==="S").map(filter=>filter.name),
      genres: filterList.filter(filter=>filter.category==="G").map(filter=>filter.name),
      score: null,
      total: null,
    }), setInterests);
  }, [interestName, filterList]);

  return (
    <div className="InterestsPage">
      <FilterBar
        filterList={filterList}
        updateFilterList={updateFilterList}
        handleInterestNameChange={setInterestName}
      />
      <InterestsList
        key={"interests-" + interests.length}
        interests={interests}
      />
    </div>
  );
};

export default InterestsPage;
