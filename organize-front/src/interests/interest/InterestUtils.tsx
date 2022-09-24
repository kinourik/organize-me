
export interface InterestType {
  number: number;
  name: string;
  type: string;
  state: string;
  score?: number;
  currently?: number;
  total?: number;
}


export const getStyleFromState: (state: string) => object = (state) => {
  const bgcolor: any = {
    Ongoing: "#00ff9f",
    Completed: "#1261d1",
    Pending: "#c3c3c3",
    Nearby: "#7a04eb",
    All: "#8386f5"
  };
  const color: any = {
    Ongoing: "#120458",
    Completed: "white",
    Pending: "#120458",
    Nearby: "white",
    All: "#120458",
  };
  return { background: bgcolor[state], color: color[state] };
};

export const getProgress: (interest: InterestType) => string = (interest) => {
  return `${interest.currently ? interest.currently : "-"} / ${
    interest.total ? interest.total : "-"
  }`;
};

export const getQtaType: (type: string) => string = (type) => {
  const qta: any = {
    Anime: "Eps.",
    Manga: "Chs.",
    Playlist: "Vds.",
    Book: "Pgs.",
  };

  return type in qta ? `${qta[type]}` : "";
};

export const getStyleFromType: (type: string) => object = (type) => {
  const bgcolor: any = {
    Anime: "#e96d5e",
    Manga: "#6a7e6a",
    Book: "#ffe69d",
    Game: "#ff9760",
    Movie: "#ac61b9",
    Playlist: "#05d9e8",
    All: "#4d9e9b"
  };
  const color: any = {
    Anime: "white",
    Manga: "white",
    Book: "#120458",
    Game: "#120458",
    Movie: "white",
    Playlist: "#120458",
    All: "#120458"
  };

  return { background: bgcolor[type], color: color[type] };
};