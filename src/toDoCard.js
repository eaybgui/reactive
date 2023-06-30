import { ToDo } from "./ToDo.js"
import styles from './toDoCard.module.css'
//import del component toDo que rep el todo i un boolean
//per a saber si es especific

//que els todos  siguen un component diferent i 
//que el toDoCard siga un component que continga els todos

export const ToDoCard = (props) => {

    const todos = props.todos
    const day = props.day.toUpperCase()
    return (
        <div className={styles.wrapper}>
        <div className={styles.container}>
            <header>
                <h1 className={styles.day}>{day}</h1>
            </header>
            <ol>
                {todos
                .filter(todo => todo.day == props.day)
                .map((todo) => 
                    <ToDo key={todo.id} onIncrement = {props.onIncrement} onDelete={props.onDelete} day={props.day} todo={todo}></ToDo>
                )}
            </ol>
            
        </div>
        </div>
    )
}


