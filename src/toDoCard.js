import { ToDo } from "./ToDo.js"
import styles from './toDoCard.module.css'
//import del component toDo que rep el todo i un boolean
//per a saber si es especific

//que els todos  siguen un component diferent i 
//que el toDoCard siga un component que continga els todos

export const ToDoCard = (props) => {

    const todos = props.todos

    return (
        <div className={styles.container}>
            
            <h1 className={styles.day}>{props.day}</h1>
            <ol>
                {todos
                .filter(todo => todo.day == props.day)
                .map((todo) => 
                    <ToDo key={todo.id} day={props.day} {...todo}></ToDo>
                )}
            </ol>
            
        </div>
    )
}


