import { React } from 'react'
import styles from './landing.module.css'


export default function landing() {

    return (
        <div className={styles.divMain}>


            <div className={styles.card}>
                <h1>Henry Food App</h1>

                <a href="/recipes" className={styles.btnStart}>
                    Start
                </a>
            </div>
        </div>
    )
}

