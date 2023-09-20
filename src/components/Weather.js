import styles from './weather.module.css'
import dayToString from '../utils/dayToString'
import { useState } from 'react'

export const WeatherForecast = ({ weather }) => {

  const [date, setDate] = useState()
  const [time, setTime] = useState()

  if(weather === undefined){
    return null
  }
  const place = weather.location.name
  const temperature = weather.current.temp_c
  const icon = weather.current.condition.icon

  const updateClock = () => {
    const date = new Date()
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    const seconds = ('0' + date.getSeconds()).slice(-2)
    let day = dayToString(date.getDay())
    day = day.charAt(0).toUpperCase() + day.slice(1)
    const dayOfMonth = date.getDate()
    const month = date.getMonth()

    const time = `${hours}:${minutes}:${seconds}`
    const dateStr = `${day}, ${dayOfMonth}/${month}`

    setDate(dateStr)
    setTime(time)
  }

  setInterval(updateClock, 1000)

  return (
    <div className={styles.container}>
      <div className={styles.date_container}>
        <div id='date' className={styles.date}>{date}</div>
        <div id='clock' className={styles.clock}>{time}</div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.weather_info}>
        <h1>Weather in {place}</h1>
        <div className={styles.weather}>
          <h1>{temperature} °C</h1>
          <img src={icon} alt="weather icon" />
        </div>
      </div>
    </div>
  )
}
