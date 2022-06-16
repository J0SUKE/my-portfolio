import styles from './Home.module.scss';
import Header from '../Header/Header';
import Canvas from '../Canvas/Canvas';
import { useContext, useEffect,useRef, useState } from 'react';
import Projects from '../Projects/Projects';
import { throttle } from 'lodash';
import { AppContext } from '../../pages';
import rehypeRaw from "rehype-raw";
import ReactMarkdown from 'react-markdown';
import { getStrapiMedia } from '../../lib/media';


export default function Home() {
  
  const {about,skills,intro,socialMedias} = useContext(AppContext);

  const [line1,line2,line3,skillsTitls,p1,p2] = useObserveSkills(styles.active);
  const lines = [line1,line2,line3]; // chaque line correspond a une categorie (frontend , backend , soft)
  const mainRef = useRef();
  const presentation = useRef();
  
  const presentationText = useRef();
  const presentationImg = useRef();
  const content = useRef();
  const upBtn = useRef();

  useEffect(()=>{


    window.addEventListener("scroll",throttle(()=>{
      const {scrollTop,clientHeight} = document.documentElement;
      if (scrollTop>=clientHeight) 
      {
        upBtn.current.classList.add(styles.active);      
      }
      else{
        upBtn.current.classList.remove(styles.active);   
      }
    },300))


    let trsh = (window.innerWidth>=800 ? (window.innerWidth<=1200 ? 0.4 : 0.6) : 0.1);

    let observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
          observer.unobserve(entry.target);
        }
      })
    },{
      threshold:trsh
    })

    

    observer.observe(presentationText.current);
    observer.observe(presentationImg.current);

  },[])


  useEffect(()=>{
    let timer = setTimeout(() => {
      mainRef.current.style.display = 'unset';
    }, 5000);

    return ()=>clearTimeout(timer);
  },[]);


  return (
    <>
      <Header/>
      <main className={styles.main} ref={mainRef}>

        <section className={styles.hero} id="home">
              <div className={styles.contact_links}>
                  <ul>
                    <li>
                      <a href={socialMedias.twitter} target='_blank' rel="noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"/></svg>
                        </a>
                    </li>
                    <a href={socialMedias.github} target='_blank' rel="noreferrer">
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"/></svg>
                      </li>
                    </a>
                
                    <a href={socialMedias.linkedin} target='_blank' rel="noreferrer">
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"/></svg>
                        </li>
                    </a>
                  </ul>
              </div>
              <div className={styles.Short_presentation}>
                <h1>{intro.attributes.title}</h1>
                <ReactMarkdown children={intro.attributes.content} skipHtml={false} rehypePlugins={[rehypeRaw]} />
              </div>
              <Canvas/>
              <div className={styles.shortLinks}>
                <ul>
                  <a href="#about"><li></li></a>
                  <a href="#skills"><li></li></a>
                  <a href="#projects"><li></li></a>
                </ul>
              </div>
              <a className={styles.srollDown} href='#about'>  
                <span></span>
              </a>
        </section>      
          <section className={styles.content} ref={content}>
              <a href="#home">
                <button className={styles.goUp} ref={upBtn}>
                  <p>Go Up</p>
                  <div className={styles.arrow}>
                    <span></span>
                  </div>
                </button>
              </a>  
              <section id="about" className={styles.presentation} ref={presentation}>
            <h1>About</h1>
            <div className={styles.presentation__content}>
              <div className={styles.presentation__content__img} ref={presentationImg}>
                  <img src={getStrapiMedia(about.attributes.image)} alt="" />
              </div>
              <div className={styles.presentation__content__text} ref={presentationText}>
                  <ReactMarkdown children={about.attributes.content} skipHtml={false} rehypePlugins={[rehypeRaw]} />
              </div>
            </div>
              </section>
              <section className={styles.skills}>
                <div className={styles.skills__content_container} id="skills">
                  <div className={styles.skills__content}>
                  <h1 ref={skillsTitls}>Web Technologies & Soft skills</h1>
                  <p ref={p1}>As someone who loves discovering new technologies, I am not afraid of learning new tools on the go as I think it is very important to use the right tool for the right task. I am also a fast learner, so I can adapt to any stack without any language or framework barriers.</p>
                  <p ref={p2}>Here are some tech-tools and libraries I am good at</p>

                  <section>
                  {
                    skills.map((item,index)=>{
                      const {attributes:{skills:{data}}} = item;
                      return (
                        <ul ref={lines[index]} key={item.id}>
                          {
                            data.map((item)=>{
                              const {attributes} = item;
                              return (
                                <li key={item.id}>
                                  <img src={getStrapiMedia(attributes.image)} alt="" />
                                  {attributes.name}
                                  
                                </li>  
                              )
                            })
                          }
                        </ul>
                      )
                    })
                  }

                  </section>
                  </div>
                </div>

                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fillOpacity="1" d="M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,85.3C840,75,960,85,1080,112C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
              </section>
              <Projects/>
              <div className={styles.contact} id="contact">
                <div className={styles.contact__content}>
                  <div className={styles.contact__content__left}>
                    <img src="/images/programming.svg" alt="" />
                  </div>
                  <div className={styles.contact__content__right}>
                    <h1>Let&apos;s make something great together.</h1>
                    <p>You can contact me via social medias or email me at <a href={`mailto:${socialMedias.email}`} target="__blank" rel="noreferrer">{socialMedias.email}</a></p>
                    <ul>
                      <li>
                        <a href={socialMedias.twitter} target="__blank" rel="noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"/></svg>
                        </a>
                      </li>
                      <li>
                        <a href={`mailto:${socialMedias.email}`} target="__blank" rel="noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,6H19a1,1,0,0,1,1,1l-8,4.88L4,7A1,1,0,0,1,5,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.28l7.48,4.57a1,1,0,0,0,1,0L20,9.28Z"/></svg>
                        </a>
                      </li>
                      <li>
                        <a href={socialMedias.linkedin} target="__blank" rel="noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"/></svg>
                        </a>                        
                      </li>
                    </ul>
                  </div>
                  
                  
                </div>
                <div className={styles.copyright}>
                    <p>© 2022 Jean Mazouni. All Rights Reserved.</p>
                  </div>
              </div>
          </section>  
      </main>
    </>
  )
}



function useObserveSkills(activeClass) {
  const line1 = useRef();
  const line2 = useRef();
  const line3 = useRef();
  const skillsTitls = useRef();
  const p1 = useRef();
  const p2 = useRef();


  const entries = [line1,line2,line3,skillsTitls,p1,p2];

  useEffect(()=>{
      let observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add(activeClass);
          }
        });  
          
      },{
        threshold:0.8
      })

      if (line1 && line2 && line3) {
          entries.forEach(element => {
            observer.observe(element.current);  
        });  
      }
      
      
      
  },[line1,line2,line3,skillsTitls,p1,p2])


  return [line1,line2,line3,skillsTitls,p1,p2];
}
