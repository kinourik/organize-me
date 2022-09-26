import axios, { AxiosResponse } from "axios";
let url = "http://localhost:8080";

export const getAndSetPetition = <T,>(path: string, setState: any) => {
  axios.get(url + path).then((response: AxiosResponse<T[]>) => {
    setState(response.data);
  });
};

export const buildInterestsPath = (pathParams: {
  name: string | null;
  types: string[] | null;
  states: string[] | null;
  genres: string[] | null;
  score: string | null;
  total: string | null;
}) => {
  let params: string[] = [];
  let { name, types, states, genres, score, total } = pathParams;
  if (name) params.push("name=" + name);
  if (types) params.push("types=" + types.join(","));
  if (states) params.push("states=" + states.join(","));
  if (genres) params.push("genres=" + genres.join(","));
  if (score) params.push("scoreSort=" + score);
  if (total) params.push("totalSort=" + total);
  console.log(
    params.length === 0 ? "/interests" : "/interests?" + params.join("&")
  );
  return params.length === 0 ? "/interests" : "/interests?" + params.join("&");
};
