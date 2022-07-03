import React,{useContext} from "react";
import { HeaderContext } from "../Layout/Layout";
import styles from './HeaderMenu.module.scss';
import Image from "next/image";
import headerLeftImg from '../../public/images/menuLeft.png'
import headerBottomImg from '../../public/images/menuBottom.jpg'

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
                    <li><a onClick={closeMenu} href="#home">Home</a></li>
                    <li><a onClick={closeMenu} href="#about">About</a></li>
                    <li><a onClick={closeMenu} href="#skills">Skills</a></li>
                    <li><a onClick={closeMenu} href="#projects">Projects</a></li>
                    <li><a onClick={closeMenu} href="#contact">Contact</a></li>
                </ul>  
            </div>
            <div className={styles.header_menu__right_img}>
                <Image
                    src={headerLeftImg}
                />
            </div>
            <div className={styles.header_menu__left}>
  
            </div>
            <div className={styles.header_menu__bottom_img}>
                <Image
                    src={headerBottomImg}
                />
            </div>
        </menu>
    )
  }
  