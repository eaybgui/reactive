import { ToDo } from './ToDo.js'
import styles from './toDoCard.module.css'

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
            .filter(todo => todo.day === props.day)
            .map((todo) =>
              <ToDo key={todo.id} onIncrement = {props.onIncrement} onDelete={props.onDelete} day={props.day} todo={todo}></ToDo>
            )}
        </ol>
      </div>
    </div>
  )
}


