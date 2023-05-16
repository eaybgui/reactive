import axios from "axios"

export const getAllTodos = () => {
    return axios.get("http://localhost:3001/api/todos")
        .then((response) => {
            const { data } = response
            return data
        })
}