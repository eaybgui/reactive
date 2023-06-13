import axios from "axios"

export const getScore = () => {
    return axios.get("http://localhost:3001/api/score")
        .then((response) => {
            const { data } = response
            return data
        })
}