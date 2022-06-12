import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.scss';


export default function Cursor({lerpValue}) {
    
    //const [position,setPosition] = useState({x:0,y:0});
    let cursorRef = useRef();
    let x = useRef(0);
    let y = useRef(0);
    let cursorTop = useRef(0);
    let lastScroll = useRef(document.documentElement.scrollTop);
    let lerpFactor = useRef(lerpValue);

    function cursorUpdate(positionX,positionY) 
    {
        //if (!this.enabled) return;
        
        x.current=lerp(x.current, positionX, lerpFactor.current);
        y.current=lerp(y.current, positionY, lerpFactor.current);

        cursorRef.current.setAttribute('style',`top:${y.current}px; left:${x.current}px;`);

        cursorTop.current = y.current;
        
        const{scrollTop} = document.documentElement;
        lastScroll.current = scrollTop;

    }

    function cursorScroll() {
        //if (!this.enabled) return;
        
        const{scrollTop} = document.documentElement;
        let deltaScroll = scrollTop-lastScroll.current;

        y.current = cursorTop.current+deltaScroll;
        cursorRef.current.setAttribute('style',`top:${y.current}px; left:${x.current}px;`);

    }


    useEffect(()=>{
        window.addEventListener("mousemove",(e)=>{
            cursorUpdate(e.pageX,e.pageY);
        })

        window.addEventListener("scroll",cursorScroll);
    },[])

  
  
    return (
    <div 
        className={styles.cursor}
        ref={cursorRef}
    >
    </div>
  )
}


function lerp(start, end, amt){
    return (1-amt)*start+amt*end
  }