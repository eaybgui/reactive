import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/todos'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const createTodo = async (todo) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, todo, config)
  return response.data
}

const getAllTodos = () => {
  return axios.get(baseUrl)
    .then((response) => response.data)
}

const removeToDo = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const updateTodo = (todo) => {
  return axios.put(`${baseUrl}/${todo.id}`, todo)
    .then(response => response.data)
}

export default { createTodo, getAllTodos, removeToDo, updateTodo, setToken }