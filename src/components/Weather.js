import styles from './weather.module.css'

export const WeatherForecast = ({ weather }) => {

  if(weather === undefined){
    return null
  }
  const place = weather.location.name
  const temperature = weather.current.temp_c
  const icon = weather.current.condition.icon

  const updateClock = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const time = `${hours}:${minutes}:${seconds}`
    document.getElementById('clock').innerHTML = time
  }

  setInterval(updateClock, 1000)

  return (
    <div className={styles.container}>
      <h1>Weather in {place}</h1>
      <div className={styles.weather}>
        <h1>{temperature} C</h1>
        <img src={icon} alt="weather icon" />
      </div>
      <div id='clock'></div>
    </div>
  )
}
