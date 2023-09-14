import { useState } from 'react'
import styles from './login.module.css'

const LoginForm = ({ handleLogin, handleUserCreate }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [createUser, setCreateUser] = useState(false)

  const login = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  const createNewUser = (event) => {
    event.preventDefault()
    handleUserCreate(username, password, name)
    setUsername('')
    setPassword('')
  }

  const action = createUser ? createNewUser : login

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={action}>
        <div className={styles.container}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          {createUser ?
            <div>
            name
              <input
                type="name"
                value={ name }
                name="name"
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            : null
          }
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">{createUser ? 'Sign in' : 'Login'}</button>
          {!createUser ? <button onClick={() => setCreateUser(true)}>Create user</button> : null}
        </div>
      </form>
    </div>
  )
}

export default LoginForm