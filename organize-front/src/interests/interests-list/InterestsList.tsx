import { useEffect, useState } from "react";
import { Interest } from "../interest/Interest";
import { InterestType } from "../interest/InterestUtils";
import InfiniteScroll from "react-infinite-scroller";
import "./InterestsList.css";

const InterestsList: React.FC<{ interests: InterestType[] }> = ({
  interests,
}) => {
  const perPage = 69;
  const [lastObjectPosition, setLastObjectPosition] = useState(0);
  const [loadedInterests, setLoadedInterests] = useState<InterestType[]>([]);
  const [interestList, setInterestList] = useState<InterestType[]>([]);
  useEffect(() => {
    setInterestList(interests);
  }, [interests]);

  const loadProducts = () => {
    setLoadedInterests((currentInterests) => {
      return currentInterests.concat(
        interestList.slice(lastObjectPosition, lastObjectPosition + perPage)
      );
    });
    setLastObjectPosition((currentValue) => {
      return currentValue + perPage;
    });
  };

  return (
    <div className="InterestsList">
      <div className="InterestsHeader">
        <span
          className="ItemHeader"
          style={{ marginLeft: "auto", marginRight: 0 }}
        >
          #
        </span>
        <span
          className="ItemHeader"
          style={{ textAlign: "left", minWidth: "100%" }}
        >
          Name
        </span>
        <span className="ItemHeader">Type</span>
        <span className="ItemHeader">Score</span>
        <span className="ItemHeader">Progress</span>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadProducts}
        hasMore={lastObjectPosition < interestList.length}
        loader={<div key={0}>Loading ...</div>}
      >
        {loadedInterests.map((interest, index) => {
          return (
            <Interest {...interest} key={interest.name} number={index + 1} />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default InterestsList;
