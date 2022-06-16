import Introduction from "../Introduction/Introduction"
import Home from "../Home/Home"
import React,{ useRef,useState } from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";

export const HeaderContext = React.createContext();


export default function Layout() {

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
    <>
        <noscript>This site needs javasctipt</noscript>
        <Introduction/>
        {
          <>
            <HeaderContext.Provider value={HeaderContextValue}>
              <Home></Home>
              {
                menuActive && <HeaderMenu/>
              }
            </HeaderContext.Provider>
          </>
        }                
    </>
  )
}

