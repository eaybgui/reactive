import { useState } from 'react'

import styles from './AddTodoForm.module.css'
const AddTodoForm = ({ handleSubmit, onChange }) => {

  const [newToDo, setNewToDo] = useState('')
  setNewToDo('')
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" onChange={ onChange() } value={newToDo}></input>
      </div>
      <div className={[styles.from_group, styles.dropdown]}>
        <input id="toggle" type="checkbox" itemID={styles.toggle}/>
        <label htmlFor="toggle">Select Days</label>
        <div className={styles.dropdown_content}>
          <input id="0" type="checkbox" value="daily" ></input>
          <label htmlFor="0">Everyday</label>
          <input id="1" type="checkbox" value="monday"></input>
          <label htmlFor="1">Mondays</label>
          <input id="2" type="checkbox" value="tuesday" ></input>
          <label htmlFor="2">Tuesdays</label>
          <input id="3" type="checkbox" value="wednesday"></input>
          <label htmlFor="3">Wednesdays</label>
          <input id="4" type="checkbox" value="thursday"></input>
          <label htmlFor="4">Thursdays</label>
          <input id="5" type="checkbox" value="friday" ></input>
          <label htmlFor="5">Fridays</label>
          <input id="6" type="checkbox" value="saturday"></input>
          <label htmlFor="6">Saturdays</label>
          <input id="7" type="checkbox" value="sunday"></input>
          <label htmlFor="7">Sundays</label>
        </div>
      </div>
      <button>Create todo</button>
    </form>
  )
}

export default AddTodoForm