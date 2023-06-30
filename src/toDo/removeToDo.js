import axios from "axios"

export const removeToDo = (id) => {
    return axios.delete("http://localhost:3001/api/todos/" + id)
        .then(response => {
            const data = response
            return data
        })
}