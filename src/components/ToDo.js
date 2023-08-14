import { useState } from 'react'
import toDosServices from '../services/toDos.js'
import styles from './toDo.module.css'
import { BsTrash } from 'react-icons/bs'

export const ToDo = (props) => {

  const toDo = props.todo
  const onDelete = props.onDelete
  let day = props.day
  let onIncrement = props.onIncrement

  const[done, setDone] = useState(props.todo.done)
  const actualDay = new Date().getDay()

  if(day === 'monday') day = 1
  else if(day === 'tuesday') day = 2
  else if(day === 'wednesday') day = 3
  else if(day === 'thursday') day = 4
  else if(day === 'friday') day = 5
  else if(day === 'saturday') day = 6
  else if(day === 'sunday') day = 0


  const changable = () => {return day === actualDay}

  const handleDone = () => {
    toDosServices.updateTodo(toDo)
    onIncrement(!done)
    setDone(!done)
  }

  return (
    <li className={styles.container}>
      <p className={styles.todo}>{toDo.content}</p>
      <i><BsTrash onClick={() => onDelete(toDo.id)} className={styles.trash}></BsTrash></i>
      <input className={styles.input} type="checkbox" disabled={!changable()} onClick={() => handleDone()} checked={done}></input>
    </li>
  )
}