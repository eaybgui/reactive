import {useState} from "react"
import { updateTodo } from "./toDo/updateToDo.js"
import styles from './toDo.module.css'

export const ToDo = (props, day) => {
    
    const toDo = props
    
    const[done, setDone] = useState(props.done)
    
    const handleImportant = () => {
        console.log("important")
        console.log(toDo)
        setDone(!done)
        updateTodo(toDo)
    }

    return (
        <li style={{display: "flex"}}>
            <p className={styles.todo}>{toDo.content}</p>
            <button onClick={() => handleImportant()}>{done ? "Done" : "Not done"}</button>
        </li>
    )
}