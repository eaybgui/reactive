import {useState} from "react"
import { updateTodo } from "./toDo/updateToDo.js"
import styles from './toDo.module.css'
import { BsTrash } from "react-icons/bs";
import { removeToDo } from './toDo/removeToDo.js'

export const ToDo = (props) => {
    
    const toDo = props.todo
    const onDelete = props.onDelete
    let day = props.day
    let onIncrement = props.onIncrement
    
    const[done, setDone] = useState(props.done)
    const actualDay = new Date().getDay()
    let yesterday = actualDay - 1

    if(day == 'monday') day = 0
    else if(day == 'tuesday') day = 1
    else if(day === 'wednesday') day = 2
    else if(day === 'thursday') day = 3
    else if(day === 'friday') day = 4
    else if(day === 'saturday') day = 5
    else if(day === 'sunday') day = 6

    if(yesterday == -1) yesterday = 6

    const changable = () => {return day == actualDay || day == yesterday}

    const handleDone = () => {
        updateTodo(toDo)
        onIncrement(!done)
        setDone(!done)
    }

    const handleRemove = () => {
        removeToDo(toDo.id)
        onDelete(toDo.id)
    }

    return (
        <li className={styles.container}>
            <p className={styles.todo}>{toDo.content}</p>
            <i><BsTrash onClick={() => handleRemove()} className={styles.trash}></BsTrash></i>
            <input className={styles.input} type="checkbox" disabled={!changable()} onClick={() => handleDone()} checked={done}></input>
        </li>
    )
}