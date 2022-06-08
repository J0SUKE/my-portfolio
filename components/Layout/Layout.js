import Introduction from "../Introduction/Introduction"
import Home from "../Home/Home"
import React,{ useEffect,useRef,useState ,useContext} from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";

export const HeaderContext = React.createContext();


export default function Layout() {

  const [home,setHome] = useState(false);

  const [menuActive,setMenuActive] = useState();
  const menuBtn = useRef();
  const menu = useRef();
      
  const HeaderContextValue = {
      menuActive,
      setMenuActive,
      menuBtn,
      menu
  }

  useEffect(()=>{
    let timer = setTimeout(() => {
        setHome(true);
    }, 5000);

    return ()=>clearTimeout(timer);
  },[]);

  return (
    <>
        {/* <Introduction/>
        {
          home && 
          (
            <HeaderContext.Provider value={HeaderContextValue}>
              <Home></Home>
              {
                menuActive && <HeaderMenu/>
              }
            </HeaderContext.Provider>
          )
        }         */}
        <HeaderContext.Provider value={HeaderContextValue}>
            <Home></Home>
            {
              menuActive && <HeaderMenu/>
            }
        </HeaderContext.Provider>
        
    </>
  )
}

