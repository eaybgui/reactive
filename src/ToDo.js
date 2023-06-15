import {useState} from "react"
import { updateTodo } from "./toDo/updateToDo.js"
import styles from './toDo.module.css'
import { updateScore } from "./score/updateScore.js"

export const ToDo = (props) => {
    
    const toDo = props
    let day = props.day
    let onIncrement = props.onIncrement
    
    const[done, setDone] = useState(props.done)
    const actualDay = new Date().getDay()
    const yesterday = actualDay - 1

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

    return (
        <li style={{display: "flex"}}>
            <p className={styles.todo}>{toDo.content}</p>
            <button disabled={!changable()} onClick={() => handleDone()}>{done ? "Done" : "Not done"}</button>
        </li>
    )
}