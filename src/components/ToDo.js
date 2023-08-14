import { useState } from 'react'
import toDosServices from '../services/toDos.js'
import styles from './toDo.module.css'
import { BsTrash } from 'react-icons/bs'

export const ToDo = (props) => {

  const toDo = props.todo
  const onDelete = props.onDelete
  const changable = props.changable
  let onIncrement = props.onIncrement

  const[done, setDone] = useState(props.todo.done)

  const handleDone = () => {
    toDosServices.updateTodo(toDo)
    onIncrement(!done)
    setDone(!done)
  }

  return (
    <li className={styles.container}>
      <p className={styles.todo}>{toDo.content}</p>
      <i><BsTrash onClick={() => onDelete(toDo.id)} className={styles.trash}></BsTrash></i>
      <input className={styles.input} type="checkbox" disabled={!changable} onClick={() => handleDone()} checked={done}></input>
    </li>
  )
}