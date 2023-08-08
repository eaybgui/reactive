import axios from 'axios'

const key = 'b62b89a142b44ee0b3f94055230808'

const getWeather = async () => {
  const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=auto:ip`)
  return response.data
}

const getIcon = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export default { getWeather, getIcon }