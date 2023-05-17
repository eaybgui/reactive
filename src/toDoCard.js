import { useState } from "react"
import { ToDo } from "./ToDo.js"
//import del component toDo que rep el todo i un boolean
//per a saber si es especific

//que els todos  siguen un component diferent i 
//que el toDoCard siga un component que continga els todos

export const ToDoCard = (props) => {

    const todos = props.todos

    return (
        <div>
            <h1>{props.day}</h1>
            <ol>
                {todos
                .filter(todo => todo.days.includes(props.day)  || todo.days.includes('daily'))
                .map((todo) => 
                    <ToDo key={todo.id} {...todo}>{todo.content}</ToDo>
                )}
            </ol>
        </div>
    )
}


