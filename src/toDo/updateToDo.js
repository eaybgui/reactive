import axios from "axios"

export const updateTodo = (todo) => {
    return axios.put("http://localhost:3001/api/todos", todo)
        .then(response => {
            const { data } = response
            return data
        })
}