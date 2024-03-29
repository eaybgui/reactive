import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import styles from './index.module.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div className={styles.app_container}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
)