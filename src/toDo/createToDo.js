import axios from "axios"

export const createTodo = ({ todo, day, done = false }) => {
    return axios.post("http://localhost:3001/api/todos", { todo, day, done })
        .then(response => {
            const { data } = response
            return data
        })
}