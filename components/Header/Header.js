import React,{ useEffect,useRef,useState ,useContext} from 'react';
import styles from './Header.module.scss';

const HeaderContext = React.createContext();

export default function Header() {
  
    const [menuActive,setMenuActive] = useState();
    const menuBtn = useRef();
    const menu = useRef();
        
    const HeaderContextValue = {
        menuActive,
        setMenuActive,
        menuBtn,
        menu
    }

    return (
        <HeaderContext.Provider value={HeaderContextValue}>
            <header className={styles.headerContainer}>
                <div className={styles.header}>
                    <div>header</div>
                    <MenuButton/>
                </div>
            </header>
            {
                menuActive && <HeaderMenu/>
            }
        </HeaderContext.Provider>
  )
}

function MenuButton() {
    
    const {menuActive,setMenuActive,menuBtn,menu} = useContext(HeaderContext);
    
    
    function ToggleMenu() {
        
        if (menuActive==undefined) return setMenuActive(true);
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


function HeaderMenu() {
    const {menu} = useContext(HeaderContext);
    
    return(
        <menu className={styles.headerMenu} ref={menu}>
                
        </menu>
    )
}