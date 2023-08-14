import axios from 'axios'
import baseUrl from '../utils/config'

const url = baseUrl + 'todos'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const getToken = () => {
  return token
}

const createTodo = async (todo) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(url, todo, config)
  return response.data
}

const getAllTodos = () => {
  return axios.get(url)
    .then((response) => response.data)
}

const removeToDo = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${url}/${id}`, config)
  return response.data
}

const updateTodo = (todo) => {
  return axios.put(`${url}/${todo.id}`, todo)
    .then(response => response.data)
}

export default { getToken, createTodo, getAllTodos, removeToDo, updateTodo, setToken }