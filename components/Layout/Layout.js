import Introduction from "../Introduction/Introduction"
import Home from "../Home/Home"
import { useEffect,useState } from "react"

export default function Layout() {

  const [home,setHome] = useState(false);

  // useEffect(()=>{
  //   let timer = setTimeout(() => {
  //       setHome(true);
  //   }, 4700);

  //   return ()=>clearTimeout(timer);
  // },[]);

  return (
    <>
        {/* <Introduction/>
        {
          home && 
          (
            <Home></Home>   
          )
        }         */}
        <Home></Home>
    </>
  )
}
