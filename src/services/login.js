import axios from 'axios'
import baseUrl from '../utils/config'

const url = baseUrl + 'login'

const login = async credentials => {
  const response = await axios.post(url, credentials)
  return response.data
}

export default { login }