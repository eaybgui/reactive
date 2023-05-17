import React from 'react';
import {ToDoCard} from './toDoCard.js';
import {useState, useEffect} from 'react';
import { getAllTodos } from './toDo/getAllTodos.js';
import { createTodo } from './toDo/createToDo.js';

//components: banner, foto de perfil, tarjeta per a cada dia, tarjeta per a tasques de hui, div per a info, grafic
//accions: afegir, editar i eliminar todos, a la tarjeta de hui i a les de cada dia, desplaçar-se entre dies, marcar tasques com a fetes
export default function App() {

    const [toDos, setToDos] = useState([])
    const [newToDo, setNewToDo] = useState("")
    const [days, setDays] = useState([])

    useEffect(() => {
        getAllTodos()
        .then((allTodos) => {
            setToDos(allTodos)
        })
    }, [])

    const handleChange = (event) => {
        setNewToDo(event.target.value)
    }

    const handleDaysSelect = (event) => {
        if(event.target.checked){
            setDays([...days, event.target.value])
        }else{
            setDays(days.filter(day => day !== event.target.value))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //get selectDays value
        
        const toDoToAddToState = {
            todo: newToDo,
            days: days
        }
        console.log(toDoToAddToState)
        createTodo(toDoToAddToState).then(newToDo => {
            setToDos([...toDos, newToDo])
        }).catch((error) => console.log(error))
        setNewToDo("")
        setDays([])
    }

    return ( 
        <div>
        --banner
        --foto de perfil
        --tarjeta per al dia
        --info
        --targetes
        --grafic 
            <div style={{display: "flex", margin: "0px 0px 0px 20px"}}>            
                <ToDoCard todos={toDos} day="monday"></ToDoCard>
                <ToDoCard todos={toDos} day="tuesday"></ToDoCard>
                <ToDoCard todos={toDos} day="wednesday"></ToDoCard>
                <ToDoCard todos={toDos} day="thursday"></ToDoCard>
                <ToDoCard todos={toDos} day="friday"></ToDoCard>
                <ToDoCard todos={toDos} day="saturday"></ToDoCard>
                <ToDoCard todos={toDos} day="sunday"></ToDoCard>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={newToDo}></input>
                <input type="checkbox" value="daily" name='0' onClick={handleDaysSelect}></input>
                <label for="0">Everyday</label>
                <input type="checkbox" value="monday" name='1' onClick={handleDaysSelect}></input>
                <label for="1">Mondays</label>
                <input type="checkbox" value="tuesday" name='2' onClick={handleDaysSelect}></input>
                <label for="2">Tuesdays</label>
                <input type="checkbox" value="wednesday" name='3' onClick={handleDaysSelect}></input>
                <label for="3">Wednesdays</label>
                <input type="checkbox" value="thursday" name='4' onClick={handleDaysSelect}></input>
                <label for="4">Thursdays</label>
                <input type="checkbox" value="friday" name='5' onClick={handleDaysSelect}></input>
                <label for="5">Fridays</label>
                <input type="checkbox" value="saturday" name='6' onClick={handleDaysSelect}></input>
                <label for="6">Saturdays</label>
                <input type="checkbox" value="sunday" name='7' onClick={handleDaysSelect}></input>
                <label for="7">Sundays</label>
                <button>Create todo</button>
            </form>
        </div>
    )
}