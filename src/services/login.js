import axios from 'axios'
import baseUrl from '../utils/config'

const loginUrl = baseUrl + 'login'
const usersUrl = baseUrl + 'users'


const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const createUser = async credentials => {
  const response = await axios.post(usersUrl, credentials)
  return response.data
}

export default { login, createUser }