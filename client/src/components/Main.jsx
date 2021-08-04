import React from 'react';
import styles from './Main.module.css'
import MostrarRecetas from './MostrarRecetas';
import Nav from './Nav';
import Buscador from './Buscador'
import Filter from './Filter'



export default function Main (){
    return (
        <div className={styles.divMain}>
            <nav className={styles.nav}>
                <Nav/>
            </nav>
            <div className={styles.buscador}>
                <Buscador/>
            </div>
            <br />
            <Filter/>
            <br />
            <div className={styles.main}>
                <MostrarRecetas/>
            </div>

        </div>
    )
}

