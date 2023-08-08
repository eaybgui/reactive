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

//components: banner, foto de perfil, tarjeta per a cada dia, tarjeta per a tasques de hui, div per a info, grafic
//accions: afegir, editar i eliminar todos, a la tarjeta de hui i a les de cada dia, desplaçar-se entre dies, marcar tasques com a fetes
export default function App() {

  const [toDos, setToDos] = useState([])
  const [newToDo, setNewToDo] = useState('')
  const [score, setScore] = useState()
  const [user, setUser] = useState(null)
  const [weather, setWeather] = useState()

  useEffect(() => {
    toDosServices.getAllTodos()
      .then((allTodos) => {
        if(!arraysAreEq(allTodos, toDos))
          setToDos(allTodos)
        console.log(allTodos)
      })
  }, [toDos])

  // useEffect(() => {
  //   scoreServices.getScore()
  //     .then((score) => {
  //       setScore(score)
  //       console.log(score)
  //     })
  // },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedReactiveUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      toDosServices.setToken(user.token)
    }
  }, [])

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

  const handleScoreChange = (operator) => {
    console.log(operator)
    if(operator)
      setScore(prevCounter => prevCounter + 1)
    else
      setScore(prevCounter => prevCounter - 1)
    scoreServices.updateScore(operator)
  }

  const handleDelete = (id) => {
    setToDos(toDos.filter(todo => todo.id !== id))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let days = getDays()
    console.log(days)
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
          days = ['monday', 'tuesday','wednesday', 'thursday', 'friday', 'saturday', 'sunday']
          break
        }
    }
    console.log(days)
    return days
  }

  const buildToDo = (days) => {
    if(newToDo !== ''){
      if(days.length > 0){
        for(let day in days){
          let toDoToAddToState = {
            content: newToDo,
            day: days[day],
            done: false
          }
          sendCreateRequest(toDoToAddToState)
        }
      }else{
        console.log('Error: No days selected')
      }
    }else{
      console.log('Error: Empty todo')
    }
  }

  const sendCreateRequest = (todo) => {
    toDosServices.createTodo(todo).then(newToDo => {
      setToDos([...toDos, newToDo])
    }).catch((error) => console.log(error))
  }

  const handleLogin = async (username, password) => {

    try{
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedReactiveUser', JSON.stringify(user)
      )

      toDosServices.setToken(user.token)
      setUser(user)
    }catch(exception){
      console.log('Wrong credentials')
      console.log(exception)
    }
  }

  let actualDay = new Date().getDay()

  switch(actualDay){
  case 0:
    actualDay = 'monday'
    break
  case 1:
    actualDay = 'tuesday'
    break
  case 2:
    actualDay = 'wednesday'
    break
  case 3:
    actualDay = 'thursday'
    break
  case 4:
    actualDay = 'friday'
    break
  case 5:
    actualDay = 'saturday'
    break
  case 6:
    actualDay = 'sunday'
    break
  default:
    break
  }

  return (
    <div>
      {user === null
        ? <LoginForm handleLogin={handleLogin}/>
        : <div>
          <div className={styles.banner}></div>
          <div className={styles.today_info}>
            <div>
              <h1>Today&apos;s todos</h1>
              <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day={actualDay}></ToDoCard>
            </div>
            <WeatherForecast weather={weather}></WeatherForecast>
          </div>
          <div className={styles.mid_info}>
            <h1>Weekly todos</h1>
            <h2>Add weekly todo</h2>
          </div>
          <div className={styles.cards_container}>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="monday"></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="tuesday"></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="wednesday"></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="thursday"></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="friday"></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="saturday"></ToDoCard>
            <ToDoCard todos={toDos} onIncrement={handleScoreChange} onDelete={handleDelete} day="sunday"></ToDoCard>
          </div>
          <div>
            <p>Your score is: {score}</p>
          </div>
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
        </div>
      }
    </div>
  )
}
