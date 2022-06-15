import { useContext, useEffect, useRef, useState } from 'react';
import styles from './Projects.module.scss';
import { AppContext } from '../../pages';
import { getStrapiMedia } from '../../lib/media';

export default function Projects() {

    const {projects} = useContext(AppContext);
    
    
    const [currentSlide,setCurrentSlide] = useState(0);
    const textSlider = useRef();
    const imagesSlider = useRef();
    const imagesContainer = useRef();

    const max = useRef(projects.length);

    function goNext() {
        if (currentSlide==max.current-1) return;
        setCurrentSlide(currentSlide=>currentSlide+1);
    }

    function goPrev() {
        if (currentSlide==0) return;
        setCurrentSlide(currentSlide=>currentSlide-1);
    }

    useEffect(()=>{
        textSlider.current.style.transform = `translateX(${-currentSlide*100}%)`;
        imagesSlider.current.style.transform = `translateX(${-currentSlide*100}%)`;
    },[currentSlide])

    return (
        <section className={styles.projects} id='projects'>
            <div className={styles.projects__container}>
            <h1>Projects</h1>
            <div className={styles.caroussel_container}>
                <div className={styles.text_container}>
                    <ul ref={textSlider}>
                        {
                            projects.map((item)=>{
                                const {attributes} = item;
                                return(
                                    <li key={item.id}>
                                        <h1>{attributes.title}</h1>
                                        <h3>{attributes.technos}</h3>
                                        <p>{attributes.desc}</p>
                                        <div className={styles.links}>
                                        <a href={attributes.demo} target="_blank" rel="noreferrer" tabIndex={-1}>
                                            <p>SEE LIVE</p>
                                            <img src="/images/arrow-up-right.svg" alt="" />
                                        </a>
                                        <a href={attributes.github}  target="_blank" rel="noreferrer" tabIndex={-1}>
                                            <p>GITHUB</p>
                                            <img src="/images/arrow-up-right.svg" alt="" />
                                        </a>
                                        </div>
                                    </li>
                                )
                            })
                        }
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
                            {
                                projects.map((item)=>{
                                    const {attributes} = item;
                                    return(
                                        <li key={item.id}>
                                            <img src={getStrapiMedia(attributes.image)} alt="" />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            
    </section>
  )
}
