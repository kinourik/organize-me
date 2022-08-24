import { useState } from "react";
import Interest from "../interest/Interest";
import "./InterestsList.css";

const InterestsList: React.FC = () => {
  let [interests, setInterests] = useState([
    {
      number: 1,
      name: "Imouto Umaru-chan",
      type: "Anime",
      state: "Completed",
      score: 8,
      currently: 4,
      total: 12
    },
    {
      number: 2,
      name: "One piece",
      type: "Manga",
      state: "Ongoing",
      score: 9,
      currently: 1012,
      total: 1025
    },
    {
      number: 3,
      name: "Madre patria [Marcelo Gullo]",
      type: "Book",
      state: "Ongoing",
      score: 10,
      currently: 222,
      total: 500
    },
    {
      number: 4,
      name: "Ghostrunner",
      type: "Game",
      state: "Nearby",
      score: 6,
    },
    {
      number: 5,
      name: "Quinto elemento",
      type: "Movie",
      state: "Pending",
      score: 10,
    },
    {
      number: 6,
      name: "Watch later",
      type: "Playlist",
      state: "Ongoing",
    },
  ]);

  return (
    <div className="InterestsList">
      {interests.map((interest) => {
        return <Interest {...interest} />;
      })}
    </div>
  );
};

export default InterestsList;
