import React from 'react'
import { ToDoCard } from './components/toDoCard.js'
import { useState, useEffect } from 'react'
import scoreServices from './services/score.js'
import toDosServices from './services/toDos.js'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.js'
import styles from './app.module.css'
import weatherServices from './services/weather.js'
import { WeatherForecast } from './components/Weather.js'
import dayToString from './utils/dayToString.js'
import Notificate from './components/Notificate.js'

export default function App() {

  const [toDos, setToDos] = useState([])
  const [newToDo, setNewToDo] = useState('')
  const [score, setScore] = useState()
  const [user, setUser] = useState(null)
  const [weather, setWeather] = useState()
  const [message, setMessage] = useState(null)

  //getting the user token from the local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedReactiveUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      toDosServices.setToken(user.token)
    }
  }, [])

  //getting all todos from the database
  useEffect(() => {
    if(user !== null)
      toDosServices.getAllTodos()
        .then((allTodos) => {
          if(!arraysAreEq(allTodos, toDos))
            setToDos(allTodos)
        })
  },[user])

  useEffect(() => {
    if(user !== null)
      scoreServices.getScore()
        .then((score) => {
          setScore(score)
        })
  },[user])

  //getting the weather from the api
  useEffect(() => {
    weatherServices.getWeather()
      .then((weatherObject) => {
        weatherServices.getIcon(`https:${weatherObject.current.condition.icon}`)
          .then((icon) => {
            const weather = { ...weatherObject, icon }
            setWeather(weather)
          })
      })
  }, [])

  const arraysAreEq = (arr1, arr2) => {
    if(arr1.length !== arr2.length) return false
    for(let i; i < arr1.length; i++)
      if(arr1[i].id !== arr2[i].id) return false
    return true
  }
  //the score change uses a boolean to determine if the score should be incremented or decremented
  const handleScoreChange = (operator) => {
    if(operator)
      setScore(prevCounter => prevCounter + 1)
    else
      setScore(prevCounter => prevCounter - 1)
    scoreServices.updateScore(operator)
  }

  const handleDelete = (id) => {
    setToDos(toDos.filter(todo => todo.id !== id))
    toDosServices.removeToDo(id)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let days = getDays()
    buildToDo(days)
    setNewToDo('')
  }

  const getDays = () => {
    let days = []
    for(let i = 0; i <= 7; i++){
      if(document.getElementById(i).checked)
        if(document.getElementById(i).value !== 'daily'){
          days.push(document.getElementById(i).value)
        }else{
          return ['monday', 'tuesday','wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }
    }
    return days
  }

  //builds each todo, stores all of them in an array and sends it to the database
  const buildToDo = async (days) => {
    let newTodos = []
    if(newToDo !== ''){
      if(days.length > 0){
        for(let day in days){
          let toDoToAddToState = {
            content: newToDo,
            day: days[day],
            done: false
          }
          newTodos.push(toDoToAddToState)
        }
        newTodos = await sendCreateRequest(newTodos)
        console.log(newTodos)
      }else{
        setMessage('You must select at least one day')
        setTimeout(() => setMessage(null), 5000)
      }
    }else{
      setMessage('You must write something')
      setTimeout(() => setMessage(null), 5000)
    }
    setToDos([...toDos, ...newTodos])
  }

  const sendCreateRequest = async (todo) => {
    try{
      const todos = await toDosServices.createTodo(todo)
      console.log(todos)
      return todos
    }catch(exception){
      console.log(exception)
    }
  }

  const handleLogin = async (username, password) => {

    try{
      const user = await loginService.login({
        username, password,
      })
      if(user){
        window.localStorage.setItem(
          'loggedReactiveUser', JSON.stringify(user)
        )

        await toDosServices.setToken(user.token)
        const todos = await toDosServices.getAllTodos()
        setUser(user)
        setToDos(todos)
        return true
      }
      return false
    }catch(exception){
      console.log(exception)
      return false
    }
  }

  const handleNewUser = async (username, password, name) => {

    if(await loginService.createUser({ username, password, name }))
      return  handleLogin(username, password)
    else
      return false
  }

  const logout = () => {
    window.localStorage.removeItem('loggedReactiveUser')
    setUser(null)
    toDosServices.setToken(null)
  }

  let actualDay = new Date().getDay()

  actualDay = dayToString(actualDay)

  return (
    <div>
      {user === null
        ? <LoginForm handleLogin={handleLogin} handleUserCreate={handleNewUser}/>
        : <div>
          <div className={styles.banner}></div>
          <div className={styles.today_info}>
            <div className={styles.today_todos}>
              <h1 style={{ color: 'white' }}>Today&apos;s todos</h1>
              <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day={actualDay} changable={true}></ToDoCard>
            </div>
            <WeatherForecast weather={weather}></WeatherForecast>
          </div>
          <div className={styles.mid_info}>
            <h1>Weekly todos</h1>
          </div>
          <div className={styles.cards_container}>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="monday" changable={false}></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="tuesday" changable={false} ></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="wednesday" changable={false}></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="thursday" changable={false}></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="friday" changable={false}></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="saturday" changable={false}></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="sunday" changable={false}></ToDoCard>
          </div>
          <div className={styles.score}>
            <p>Your score is:</p>
            <h1>{score}</h1>
          </div>
          <Notificate message={message} error={true}></Notificate>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={({ target }) => setNewToDo(target.value)} value={newToDo}></input>
            <input id="0" type="checkbox" value="daily" ></input>
            <label htmlFor="0">Everyday</label>
            <input id="1" type="checkbox" value="monday"></input>
            <label htmlFor="1">Mondays</label>
            <input id="2" type="checkbox" value="tuesday" ></input>
            <label htmlFor="2">Tuesdays</label>
            <input id="3" type="checkbox" value="wednesday"></input>
            <label htmlFor="3">Wednesdays</label>
            <input id="4" type="checkbox" value="thursday"></input>
            <label htmlFor="4">Thursdays</label>
            <input id="5" type="checkbox" value="friday" ></input>
            <label htmlFor="5">Fridays</label>
            <input id="6" type="checkbox" value="saturday"></input>
            <label htmlFor="6">Saturdays</label>
            <input id="7" type="checkbox" value="sunday"></input>
            <label htmlFor="7">Sundays</label>
            <button>Create todo</button>
          </form>
          <button onClick={() => { logout() }}>Logout</button>
        </div>
      }
    </div>
  )
}
