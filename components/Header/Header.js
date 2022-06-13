import React,{ useEffect,useRef ,useContext, useState} from 'react';
import styles from './Header.module.scss';
import {HeaderContext} from '../Layout/Layout'
import { throttle } from 'lodash';


export default function Header() {
    
    const headerRef = useRef();
    const [headerClass,setHeaderClass] = useState("");
    let lastScroll = useRef(document.documentElement.scrollTop);
    
    useEffect(()=>{
        


        function headerScroll() {
            
            const {scrollTop} = document.documentElement;   
            let deltaScroll = scrollTop - lastScroll.current;

            if (scrollTop==0) 
            {
                setHeaderClass(styles.static);                
                return;
            }

            if (deltaScroll>0) // on scroll vers le haut (en direction du bas)
            {
                setHeaderClass(styles.scrollUp)
            }
            else if(deltaScroll<0)
            {
                setHeaderClass(styles.scrollDown);
            }
            lastScroll.current = scrollTop;
        }

        function handleResize() {
            window.scrollTo(0,0);
        }
        
        
        window.addEventListener("scroll",throttle(()=>{headerScroll()}),500);
        //window.addEventListener("resize",throttle(()=>{handleResize()}),500);
    },[])

    return (
        <header className={`${styles.headerContainer} ${headerClass}`} ref={headerRef}>
            <div className={styles.header}>
                <div><p>Jean  Mazouni</p></div>
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
