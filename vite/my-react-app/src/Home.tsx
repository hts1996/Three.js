import { useState } from 'react'
import styles from './Home.module.css';
function Home() {

  return (
    <div className={styles.main_container}>
      <div className={styles.temp_box}>1</div>
      <div className={styles.temp_box}>2</div>
      <div className={styles.temp_box}>3</div>
      <div className={styles.temp_box}>4</div>
      <div className={styles.temp_box}>5</div>
      <div className={styles.temp_box}>6</div>
      <div className={styles.temp_box}>7</div>
      <div className={styles.temp_box}>8</div>
    </div>
  )
}

export default Home
