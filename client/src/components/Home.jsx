import React from 'react';
import Nav from './Nav';
import MostrarRecetas from './MostrarRecetas';
import styles from './Home.module.css'
import Buscador from './Buscador'

export default function Home() {
    return (
        <div className={styles.principal}>
            <nav className={styles.nav}>
                <Nav />
            </nav>
            <div className={styles.Buscador}>
                <Buscador/>
            </div>
            <div className={styles.main}>
                <MostrarRecetas />
            </div>
        </div>
    )
}