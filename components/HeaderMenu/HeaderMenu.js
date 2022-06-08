import React,{useContext} from "react";
import { HeaderContext } from "../Layout/Layout";
import styles from './HeaderMenu.module.scss';

export default function HeaderMenu() {
    const {menu,menuActive,setMenuActive} = useContext(HeaderContext);
    
    function closeMenu() {
        
        menu.current.classList.add(styles.inactive);
        setTimeout(() => {
            setMenuActive(false);
        }, 800);
    }


    return(
        <menu
          className={`${styles.header_menu} ${menuActive? styles.active : styles.inactive}`} ref={menu}>
            
            <button 
                className={styles.close_btn}
                onClick={closeMenu}
            >
                <span></span><span></span>
            </button>
            
            <div className={styles.header_menu__right}>
                
                <ul className={styles.big_links}>
                    <li><a href="#">Présentation</a></li>
                    <li><a href="#">Projets</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Informations</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
  
                <ul className={styles.small_links}>
                    <li><a href="#">React<span>(4)</span></a></li>
                    <li><a href="#">Javascript<span>(6)</span></a></li>
                    <li><a href="#">NEXT JS <span>(2)</span></a></li>
                    <li><a href="#">Strapi<span>(4)</span></a></li>
                </ul>
  
            </div>
            <div className={styles.header_menu__right_img}>
                <img src="/images/menuLeft.jpg" alt=""/>
            </div>
            <div className={styles.header_menu__left}>
  
            </div>
            {/* <div className={styles.header_menu__bottom_img}>
                <img src="/images/menuBottom.jpg" alt=""/>
            </div> */}
        </menu>
    )
  }
  