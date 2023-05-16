import axios from "axios"

export const createTodo = ({ todo, days, done = false }) => {
    return axios.post("http://localhost:3001/api/todos", { todo, days, done })
        .then(response => {
            const { data } = response
            return data
        })
}