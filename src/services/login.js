import axios from 'axios'
import baseUrl from '../utils/config'

const loginUrl = baseUrl + 'login'
const usersUrl = baseUrl + 'users'


const login = async credentials => {
  try{
    const response = await axios.post(loginUrl, credentials)
    return response.data
  }catch(exception){
    console.log(exception)
    return false
  }
}

const createUser = async credentials => {
  try{
    const response = await axios.post(usersUrl, credentials)
    return response.data
  }catch(exception){
    console.log(exception)
    return false
  }
}

export default { login, createUser }