import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/score'

const getScore = () => {
  return axios.get(baseUrl)
    .then((response) => response.data)
}

const updateScore = (operation) => {
  return axios.put(baseUrl, { operation })
    .then((response) => response.data)
}

export default { getScore, updateScore }