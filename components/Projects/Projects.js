import { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.scss';

export default function Projects() {
  
    const [currentSlide,setCurrentSlide] = useState(0);
    const textSlider = useRef();
    const imagesSlider = useRef();
    const imagesContainer = useRef();
    
    const max = useRef(4);

    function goNext() {
        if (currentSlide==max.current-1) return;
        imagesContainer.current.classList.add(styles.next);
        setTimeout(()=>{
            imagesContainer.current.classList.remove(styles.next);
        },500)
        setCurrentSlide(currentSlide=>currentSlide+1);
    }

    function goPrev() {
        if (currentSlide==0) return;

        imagesContainer.current.classList.add(styles.prev);
        setTimeout(()=>{
            imagesContainer.current.classList.remove(styles.prev);
        },500)

        setCurrentSlide(currentSlide=>currentSlide-1);
    }

    useEffect(()=>{
        textSlider.current.style.transform = `translateX(${-currentSlide*100}%)`;
        imagesSlider.current.style.transform = `translateX(${-currentSlide*100}%)`;
    },[currentSlide])
  
    return (
        <section className={styles.projects} id='projects'>
            <h1>Projects</h1>
            <div className={styles.caroussel_container}>
                <div className={styles.text_container}>
                    <ul ref={textSlider}>
                        <li>
                            <h1>E-COMMERCE SHOP</h1>
                            <h3>#REACT.JS #REACT.ROUTER</h3>
                            <p>A fully client side E-commerce website interface, using React JS and React Router for the client Side rendering , it fetches data from a custon API.</p>
                            <div className={styles.links}>
                                <a href="">SEE LIVE</a>
                                <a href="">GITHUB</a>
                            </div>
                        </li>
                        <li>
                            <h1>PROTON CRYPTO-APP</h1>
                            <h3>#JAVASCRIPT</h3>
                            <p>A crypto-currencies App that fetches a third party API to get and show data about a given crypto , built with vanilla Javascript</p>
                            <div className={styles.links}>
                                <a href="">SEE LIVE</a>
                                <a href="">GITHUB</a>
                            </div>
                        </li>
                        <li>
                            <h1>LE BLOG DE JEAN</h1>
                            <h3>#REACT.JS #NEXT.JS #STRAPI</h3>
                            <p>A Blog app with Next Js for the server side rendering (static rendering) and Strapi for the content management</p>
                            <div className={styles.links}>
                                <a href="">SEE LIVE</a>
                                <a href="">GITHUB</a>
                            </div>
                        </li>
                        <p></p>
                        <li>
                            <h1>HIFOAM SHOES-STORE</h1>
                            <h3>#JAVASCRIPT #THREE JS</h3>
                            <p>A simple product page using Three js for the 3d model</p>
                            <div className={styles.links}>
                                <a href="">SEE LIVE</a>
                                <a href="">GITHUB</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.images_container} ref={imagesContainer}>
                    {
                        currentSlide!=0 ? <button className={styles.btnPrev} onClick={goPrev}>
                            <img src="/images/arrow-left.svg" alt="" />
                        </button> : null
                    }
                    
                    {
                        currentSlide<max.current-1 ? <button className={styles.btnNext} onClick={goNext}>
                            <img src="/images/arrow-right.svg" alt="" />
                        </button> : null
                    }
                    <div className={styles.images_caroussel}>
                        <ul ref={imagesSlider}>
                            <li>
                                <img src="/images/huawei2.png" alt="" />
                                <img src="/images/huawei1.png" alt="" />
                            </li>
                            <li>
                                <img src="/images/proton1.png" alt="" />
                                <img src="/images/proton2.png" alt="" />
                            </li>
                            <li>
                                
                            </li>
                            <li>
                                <img src="/images/hifoam1.jpg" alt="" style={{top:0 + '%',width:100 + '%'}}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </section>
  )
}
