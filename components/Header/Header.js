import React,{ useEffect,useRef ,useContext, useState} from 'react';
import styles from './Header.module.scss';
import {HeaderContext} from '../Layout/Layout'
import { throttle } from 'lodash';
import isMobile from '../../utils/isMobile';


export default function Header({mainRef}) {
    
    const headerRef = useRef();
    let lastScroll = useRef(0);
    
    useEffect(()=>{
        

        function headerScrollDesktop() {
            
            const {scrollTop} = mainRef.current;   
            let deltaScroll = scrollTop - lastScroll.current;

            if (scrollTop==0) 
            {
                headerRef.current.className = `${styles.headerContainer} ${styles.static}`;       
                return;
            }

            if (deltaScroll>0) // on scroll vers le haut (en direction du bas)
            {
                headerRef.current.className = `${styles.headerContainer} ${styles.scrollUp}`;
            }
            else if(deltaScroll<0)
            {
                headerRef.current.className = `${styles.headerContainer} ${styles.scrollDown}`;
            }
            lastScroll.current = scrollTop;
        }

        function headerScrollMobile() {
            const {scrollTop} = mainRef.current;   

            if (scrollTop==0) 
            {
                headerRef.current.className = `${styles.headerContainer} ${styles.static}`;
                return;
            }
            else
            {
                headerRef.current.className = `${styles.headerContainer} ${styles.scrollDown}`;
            }
            
            lastScroll.current = scrollTop;
        }

        const scrollFunction = (isMobile() ? headerScrollMobile : headerScrollDesktop);

        mainRef.current?.addEventListener("scroll",throttle(()=>{scrollFunction()}),1000);
    },[headerRef])

    return (
        <header className={`${styles.headerContainer}`} ref={headerRef}>
            <div className={styles.header}>
                <div><p>Jean  Mazouni</p></div>
                <MenuButton/>
            </div>
        </header>
  )
}

function MenuButton() {
    
    const {menuActive,setMenuActive,menuBtn} = useContext(HeaderContext);

    
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
