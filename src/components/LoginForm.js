import { useState } from 'react'
import styles from './login.module.css'
import Loader from './Loader.js'
import Notificate from './Notificate'

const LoginForm = ({ handleLogin, handleUserCreate }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [createUser, setCreateUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const login = async (event) => {
    event.preventDefault()
    if(username === '' || password === ''){
      setMessage('Please fill all the fields')
      setTimeout(() => setMessage(null), 5000)
      return
    }
    setLoading(true)
    if(!await handleLogin(username, password)){
      setMessage('Wrong credentials')
      setTimeout(() => setMessage(null), 5000)
    }
    setUsername('')
    setPassword('')
    setLoading(false)
  }

  const createNewUser = async (event) => {
    event.preventDefault()
    if(username === '' || password === '' || name === ''){
      setMessage('Please fill all the fields')
      setTimeout(() => setMessage(null), 5000)
      return
    }
    setLoading(true)
    if(!await handleUserCreate(username, password, name)){
      setMessage('Username already taken')
      setTimeout(() => setMessage(null), 5000)
    }
    setUsername('')
    setPassword('')
    setLoading(false)
  }

  const action = createUser ? createNewUser : login

  return (
    <div className={styles.body}>
      {loading ? <Loader /> :
        <form className={styles.form} onSubmit={action}>
          <Notificate message={message} error={true}/>
          <div className={styles.container}>
            <p className={styles.title}>Login</p>
            <div>
              <input
                className={styles.input}
                type="text"
                placeholder='Username'
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            {createUser ?
              <div>
                <input
                  className={styles.input}
                  placeholder='Name'
                  type="name"
                  value={ name }
                  name="name"
                  onChange={({ target }) => setName(target.value)}
                />
              </div>
              : null
            }
            <div>
              <input
                className={styles.input}
                placeholder='Password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className={styles.button} type="submit">{createUser ? 'Sign in' : 'Login'}</button>
            <button className={styles.button} type='button' onClick={() => setCreateUser(!createUser)}>{createUser ? 'Go back' : 'Create user'}</button>
          </div>
        </form>
      }
    </div>
  )
}

export default LoginForm