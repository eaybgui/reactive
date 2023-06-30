import React from 'react';
import {ToDoCard} from './toDoCard.js';
import {useState, useEffect} from 'react';
import { getAllTodos } from './toDo/getAllTodos.js';
import { createTodo } from './toDo/createToDo.js';
import { getScore } from './score/getScore.js'
import { updateScore } from './score/updateScore.js'
import styles from './app.module.css'

//components: banner, foto de perfil, tarjeta per a cada dia, tarjeta per a tasques de hui, div per a info, grafic
//accions: afegir, editar i eliminar todos, a la tarjeta de hui i a les de cada dia, desplaçar-se entre dies, marcar tasques com a fetes
export default function App() {

    const [toDos, setToDos] = useState([])
    const [newToDo, setNewToDo] = useState("")
    const [score, setScore] = useState()

    useEffect(() => {
        getAllTodos()
        .then((allTodos) => {
            if(!arraysAreEq(allTodos, toDos))
                setToDos(allTodos)
                console.log(allTodos)
        })
    }, [toDos])

    useEffect(() => {
        getScore()
        .then((score) => {
            setScore(score)
            console.log(score)
        })
    },[])

    const arraysAreEq = (arr1, arr2) => {
        if(arr1.length != arr2.length) return false
        for(let i; i < arr1.length; i++)
            if(arr1[i].id != arr2[i].id) return false
        return true
    }

    const handleScoreChange = (operator) => {
        console.log(operator)
        if(operator)
            setScore(prevCounter => prevCounter + 1)
        else
            setScore(prevCounter => prevCounter - 1)
        updateScore(operator)
    }

    const handleChange = (event) => {
        setNewToDo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let days = getDays()
        console.log(days)
        buildToDo(days)
        setNewToDo("")
    }

    const handleDelete = (id) => {
        setToDos(toDos.filter(todo => todo.id != id))
    }

    const getDays = () => {
        let days = []
        for(let i = 0; i <= 7; i++){
            if(document.getElementById(i).checked)
                if(document.getElementById(i).value != 'daily'){
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
        if(newToDo != ""){
            if(days.length > 0){
                for(let day in days){
                    let toDoToAddToState = {
                        todo: newToDo,
                        day: days[day]
                    }
                    sendCreateRequest(toDoToAddToState)
                }
            }else{
                console.log("Error: No days selected")
            }
        }else{
            console.log("Error: Empty todo")
        }
    }

    const sendCreateRequest = (todo) => {
        createTodo(todo).then(newToDo => {
            setToDos([...toDos, newToDo])
        }).catch((error) => console.log(error))
    }

    return ( 
        <div>
        --banner
        --foto de perfil
        --tarjeta per al dia
        --info
        --targetes
        --grafic 
            <div style={{display: "flex", margin: "0px 20px 0px 20px"}}>            
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
                <button onClick={handleScoreChange}>+</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={newToDo}></input>
                <input id="0" type="checkbox" value="daily" ></input>
                <label for="0">Everyday</label>
                <input id="1" type="checkbox" value="monday"></input>
                <label for="1">Mondays</label>
                <input id="2" type="checkbox" value="tuesday" ></input>
                <label for="2">Tuesdays</label>
                <input id="3" type="checkbox" value="wednesday"></input>
                <label for="3">Wednesdays</label>
                <input id="4" type="checkbox" value="thursday"></input>
                <label for="4">Thursdays</label>
                <input id="5" type="checkbox" value="friday" ></input>
                <label for="5">Fridays</label>
                <input id="6" type="checkbox" value="saturday"></input>
                <label for="6">Saturdays</label>
                <input id="7" type="checkbox" value="sunday"></input>
                <label for="7">Sundays</label>
                <button>Create todo</button>
            </form>
        </div>
    )
}
