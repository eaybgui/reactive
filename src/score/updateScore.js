import axios from "axios"

export const updateScore = (operation) => {
    return axios.put("http://localhost:3001/api/score", { operation })
        .then(response => {
            const data = response
            return data
        })
}