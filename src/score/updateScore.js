import axios from "axios"

export const updateScore = () => {
    return axios.put("http://localhost:3001/api/score")
        .then(response => {
            const data = response
            return data
        })
}