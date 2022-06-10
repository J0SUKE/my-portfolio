import React,{ useEffect,useRef,useState ,useContext} from 'react';
import styles from './Header.module.scss';
import {HeaderContext} from '../Layout/Layout'


export default function Header() {
  
    

    return (
        <header className={styles.headerContainer}>
            <div className={styles.header}>
                <div><p>JEAN</p></div>
                <MenuButton/>
            </div>
        </header>
  )
}

function MenuButton() {
    
    const {menuActive,setMenuActive,menuBtn,menu} = useContext(HeaderContext);

    
    return(
        <button 
            ref={menuBtn}
            className={`${styles.menuBtn} ${menuActive ? styles.active : ""}`}
            onClick={()=>{setMenuActive(true)}}
        >
            <span></span>
            <span></span>
        </button>
    )   
}
