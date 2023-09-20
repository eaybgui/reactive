import styles from './Notificate.module.css'

const Notificate = ({ message, error }) => {

  return (
    <div>
      {message ? <div className={error ? styles.error : styles.success}>{message}</div> : null}
    </div>
  )
}

export default Notificate