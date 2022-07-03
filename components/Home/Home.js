import styles from './Home.module.scss';
import Header from '../Header/Header';
import { useEffect,useRef} from 'react';
import Projects from '../Projects/Projects';
import { throttle } from 'lodash';

import Hero from './Hero/Hero';
import About from './About/About';
import Skills from './Skills/Skills';
import Contact from './Contact/Contact';


export default function Home() {


  const mainRef = useRef();
  
  const content = useRef();
  const upBtn = useRef();

  useEffect(()=>{

    mainRef.current.addEventListener("scroll",throttle(()=>{
      const {scrollTop,clientHeight} = mainRef.current;
      if (scrollTop>=clientHeight) 
      {
        upBtn.current.classList.add(styles.active);      
      }
      else{
        upBtn.current.classList.remove(styles.active);   
      }
    },100))
  },[])

  return (
    <>
      <Header mainRef={mainRef}/>
      <main className={styles.main} ref={mainRef}>

          <Hero mainRef={mainRef}/>
          <section className={styles.content} ref={content}>
              <a href="#home">
                <button className={styles.goUp} ref={upBtn}>
                  <p>Go Up</p>
                  <div className={styles.arrow}>
                    <span></span>
                  </div>
                </button>
              </a>  
              <About/>
              <Skills/>
              <Projects/>
              <Contact/>
          </section>  
      </main>
    </>
  )
}