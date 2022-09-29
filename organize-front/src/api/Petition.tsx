import axios, { AxiosResponse } from "axios";
let url = "http://localhost:8080";

export const getListAndSetPetition = <T,>(path: string, setState: any) => {
  axios.get(url + path).then((response: AxiosResponse<T[]>) => {
    setState(response.data);
  });
};
export const getAndSetPetition = <T,>(path: string, setState: any) => {
  axios.get(url + path).then((response: AxiosResponse<T>) => {
    setState(response.data);
  });
};
export const postPetition = <T,>(path: string, body: any): (Promise<AxiosResponse<T>>)=> {
  return axios.post(url + path, body)
};
export const putPetition = <T,>(path: string, body: any): (Promise<AxiosResponse<T>>) => {
  return axios.put(url + path, body)
};
export const deletePetition = <T,>(path: string): (Promise<AxiosResponse<T>>) => {
  return axios.delete(url + path)
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
  return params.length === 0 ? "/interests" : "/interests?" + params.join("&");
};
