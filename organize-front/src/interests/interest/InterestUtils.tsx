
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
  const color: any = {
    Ongoing: "#00ff9f",
    Completed: "#001eff",
    Pending: "#c3c3c3",
    Nearby: "#bd00ff",
  };

  return { background: color[state] };
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

export const getStyleFromType: (state: string) => object = (state) => {
  const color: any = {
    Anime: "#e96d5e",
    Manga: "#ff9760",
    Book: "#ffe69d",
    Game: "#6a7e6a",
    Movie: "#ac61b9",
    Playlist: "#05d9e8",
  };

  return { background: color[state] };
};