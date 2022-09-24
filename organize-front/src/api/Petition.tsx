
import axios, { AxiosResponse } from "axios";
let url = "http://localhost:8080"

export const GetAndSetPetition = <T,>(path: string, setState: any) => {
    axios.get(url+path)
            .then((response: AxiosResponse<T[]>) => {
                setState(response.data);
        })
}
