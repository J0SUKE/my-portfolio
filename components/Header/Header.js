import React,{ useEffect,useRef,useState ,useContext} from 'react';
import styles from './Header.module.scss';
import {HeaderContext} from '../Layout/Layout'


export default function Header() {
  
    

    return (
        <header className={styles.headerContainer}>
            <div className={styles.header}>
                <div><strong>JEAN</strong></div>
                <MenuButton/>
            </div>
        </header>
  )
}

function MenuButton() {
    
    const {menuActive,setMenuActive,menuBtn,menu} = useContext(HeaderContext);
    
    
    function ToggleMenu() {
        
        if (menuActive==undefined)  setMenuActive(true);
        else if(menuActive==true) 
        {
            menuBtn.current.classList.add(styles.inactive);
            menu.current.classList.add(styles.inactive);
            setTimeout(() => {
                setMenuActive(menu=>!menu);
            }, 400);
        }
        else
        {
            setMenuActive(true);
        }
    }
    
    return(
        <button 
            ref={menuBtn}
            className={`${styles.menuBtn} ${menuActive ? styles.active : ""}`}
            onClick={ToggleMenu}
        >
            <span></span>
            <span></span>
        </button>
    )   
}
