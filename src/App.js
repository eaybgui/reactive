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

    useEffect(() => {
        getAllTodos()
        .then((allTodos) => {
            setToDos(allTodos)
        })
    }, [])

    const handleChange = (event) => {
        setNewToDo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //get selectDays value
        let days = document.getElementById("selectDays").value
        
        const toDoToAddToState = {
            todo: newToDo,
            days: days
        }
        console.log(toDoToAddToState)
        createTodo(toDoToAddToState).then(newToDo => {
            setToDos([...toDos, newToDo])
        }).catch((error) => console.log(error))
        setNewToDo("")
    }

    return ( 
        <div >
        --banner
        --foto de perfil
        --tarjeta per al dia
        --info
        --targetes
        --grafic 
            <ToDoCard todos={toDos} day="monday"></ToDoCard>
            <ToDoCard todos={toDos} day="tuesday"></ToDoCard>
            <form onSubmit={handleSubmit}>
            //aco en el final estaria ocult fins que li dones al boto de afegir
                <input type="text" onChange={handleChange} value={newToDo}></input>
                <select id="selectDays"name="days">
                    <option value="daily">Everyday</option>
                    <option value="monday">Mondays</option>
                </select>
                <button>Create todo</button>

            </form>
        </div>
    )
}