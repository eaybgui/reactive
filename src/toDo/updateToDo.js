import axios from "axios"

export const updateTodo = ({ todo, days, done = false }) => {
    return axios.put("http://localhost:3001/api/todos", { todo, days, done })
        .then(response => {
            const { data } = response
            return data
        })
}