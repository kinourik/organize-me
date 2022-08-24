import "./Interest.css";

export interface InterestProps {
  number: number;
  name: string;
  type: string;
  state: string;
  score?: number;
  currently?: number;
  total?: number;
}

const Interest: React.FC<InterestProps> = (interest) => {
  return (
    <div className="Interest">
      <div className="InterestStateNumber">
        <div className="InterestState" style={getStyleFromState(interest.state)}></div>
        <div className="InterestNumber">{interest.number}</div>
      </div>
      <div className="InterestName">{interest.name}</div>
      <div className="InterestType">{interest.type}</div>
      <div className="InterestScore">{interest.score}</div>
      <div className="InterestProgress">{getQtaType(interest.type)}</div>
    </div>
  );
};



const getStyleFromState: (state: string)=> object = (state) => {
  const color: any = {
    Ongoing: "#2db039",
    Completed: "#26448f",
    Pending: "#c3c3c3",
    Nearby: "#8d2de7",
  };

  return {background : color[state]}
}




const getProgress: (interest: InterestProps)=> string = (interest) => {
  return `${interest.currently?interest.currently:"-"} / ${interest.total? interest.total:"-"}`
};

const getQtaType: (type: string)=> string = (type) => {
  const qta: any = {
    Anime: "Eps.",
    Manga: "Chs.",
    Playlist: "Vds.",
    Book: "Pgs.",
  };

  return type in qta
    ? `${qta[type]}`
    : "- / -";
};
export default Interest;
