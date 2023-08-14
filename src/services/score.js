import axios from 'axios'
import toDosServices from './toDos'
import baseUrl from '../utils/config'

const url = baseUrl + 'score'

const getScore = async () => {
  const config = {
    headers: { Authorization: toDosServices.getToken() },
  }
  const response = await axios.get(url, config)
  return response.data
}

const updateScore = (operation) => {
  console.log(operation)
  const config = {
    headers: { Authorization: toDosServices.getToken() }
  }
  const response = axios.put(url, { operation }, config)
  return response.data
}

export default { getScore, updateScore }