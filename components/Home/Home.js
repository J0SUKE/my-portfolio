import styles from './Home.module.scss';
import Header from '../Header/Header';
import Canvas from '../Canvas/Canvas';
import { useState,useEffect,useRef } from 'react';
import Link from 'next/link';
import { ParallaxProvider,Parallax } from 'react-scroll-parallax';

export default function Home() {
    
  return (
    <>
      <Header/>
      <main className={styles.main}>
        <ParallaxProvider>
            <ParallaxContext/>
        </ParallaxProvider>
      </main>
    </>
  )
}


function ParallaxContext() {
  
  const [line1,line2,line3] = useObserveSkills(styles.active);
  const presentation = useRef();

  useEffect(()=>{
    
    let observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
          observer.unobserve(entry.target);
        }
      })
    },{
      threshold:0.7
    })

    observer.observe(presentation.current);

  },[])

  return(
          <>
              <section className={styles.hero}>
                    <div className={styles.contact_links}>
                        <ul>
                          <li>
                            <Link href={'https://twitter.com/Jean_M_____I'}>
                              <a>
                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"/></svg>
                              </a>
                            </Link>
                          </li>
                          <Link href={'https://github.com/J0SUKE'}>
                            <a>
                              <li>
                              <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"/></svg>
                            </li>
                            </a>
                          </Link>
                      
                          <Link href={'https://twitter.com/Jean_M_____I'}>
                            <a>
                              <li>
                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#000000" d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"/></svg>
                              </li>
                            </a>
                          </Link>
                        </ul>
                    </div>
                    <div className={styles.Short_presentation}>
                      <h1>React developer and Web Integrator</h1>
                      <p>Hi There 🖐! I&apos;m Jean, <strong>self taught</strong> front-end developer who is very enthusiastic about the latest web technologies 💻</p>
                      <p>I am passionate about <strong>modern design</strong>🎨 and <strong>clean Code</strong> ,threfore my objective is to provide the best <strong>User Experience</strong> 🚀!</p>
                    </div>
                    <Canvas/>
                    <div className={styles.shortLinks}>
                      <ul>
                        <a href="#about"><li></li></a>
                        <a href="#skills"><li></li></a>
                        <a href="#projects"><li></li></a>
                      </ul>
                    </div>
              </section>
              <Parallax translateY={['0vh', '-100vh']}>
                <section className={styles.content}>
                  <section id="about" className={styles.presentation} ref={presentation}>
                      <h1>About</h1>
                      <div className={styles.presentation__content}>
                        <div className={styles.presentation__content__img}>
                            <img src="/images/presentation.jpg" alt="" />
                        </div>
                        <div className={styles.presentation__content__text}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, quo amet neque sint dolorem blanditiis corporis, id obcaecati, totam placeat laboriosam! Quidem cumque voluptatum et vero cum, temporibus provident quisquam.
                            Nemo repudiandae cumque aliquid exercitationem, dolorem ducimus porro deleniti dolorum magnam accusantium molestiae esse nesciunt est ipsa debitis tenetur maxime! Mollitia beatae magnam officiis ab doloremque quod quae a perferendis.
                            Neque, debitis. Veniam fugiat quae facilis temporibus ducimus et reiciendis nisi porro odio sequi dolorum nostrum, dolor impedit doloribus quo voluptas sunt? Reiciendis ipsam ex porro alias officia qui eaque.
                        </div>
                      </div>
                  </section>

                  <section id="skills" className={styles.skills}>
                      <h1>Web Technologies & Soft skills</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea explicabo quas dignissimos? Exercitationem quis itaque aspernatur reprehenderit vitae doloribus ut distinctio sunt, eveniet, pariatur numquam harum laboriosam! Nobis, facilis expedita?Lorem ipsum dolor sit amet consectetur</p>

                      <section>
                        <ul ref={line1}>
                          <li>
                            <img src="/images/react.svg" alt="" />
                            React JS
                          </li>
                          <li>
                            <img src="/images/next.png" alt="" />
                            Next JS</li>
                          <li>
                            <img src="/images/threejs.svg" alt="" />
                            Three JS</li>
                          <li>
                            <img src="/images/sass.svg" alt="" />
                            Sass
                          </li>
                        </ul>
                        <ul ref={line2}>
                          <li>
                            <img src="/images/strapi.svg" alt="" />
                            Strapi
                          </li>
                          <li>
                            <img src="/images/firebase.svg" alt="" />
                            FireBase
                          </li>
                          <li>
                            <img src="/images/web.png" alt="" />
                            Web APIs
                          </li>
                        </ul>
                        <ul ref={line3}>
                          <li>
                            <img src="/images/github-2.svg" alt="" />
                            Git & Github
                          </li>
                          <li>
                            <img src="/images/vercel.svg" alt="" />
                            Vercel
                          </li>
                          <li>
                            <img src="/images/heroku.svg" alt="" />
                            Heroku
                          </li>
                        </ul>
                      </section>

                  </section>
                </section>  
              </Parallax>
          </>
  )
}



function useObserveSkills(activeClass) {
  const line1 = useRef();
  const line2 = useRef();
  const line3 = useRef();

  const entries = [line1,line2,line3];

  useEffect(()=>{
      let observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add(activeClass);
          }
        });  
          
      },{
        threshold:0.9
      })

      if (line1 && line2 && line3) {
          entries.forEach(element => {
            observer.observe(element.current);  
        });  
      }
      
      
      
  },[line1,line2,line3])


  return [line1,line2,line3];
}