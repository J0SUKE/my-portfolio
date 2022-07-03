import { useContext, useEffect, useRef, useState } from 'react';
import styles from './Projects.module.scss';
import { AppContext } from '../../pages';
import { getStrapiMedia } from '../../lib/media';
import Image from 'next/image';
import arrowUpright from '../../public/images/arrow-up-right.svg';
import arrowleft from '../../public/images/arrow-left.svg';
import arrowRight from '../../public/images/arrow-right.svg';


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
                        <div className={styles.caroussel_text}>
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
                                                        <Image
                                                            src={arrowUpright}
                                                            width={30}
                                                        />
                                                    </a>
                                                    <a href={attributes.github}  target="_blank" rel="noreferrer" tabIndex={-1}>
                                                        <p>GITHUB</p>
                                                        <Image
                                                            src={arrowUpright}
                                                            width={30}
                                                        />
                                                    </a>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={styles.images_container} ref={imagesContainer}>
                        {
                            currentSlide!=0 ? <button className={styles.btnPrev} onClick={goPrev}>
                                <Image src={'/images/arrow-left.svg'} width={40} height={30}/>
                            </button> : null
                        }

                        {
                            currentSlide<max.current-1 ? <button className={styles.btnNext} onClick={goNext}>
                                <Image src={'/images/arrow-right.svg'} width={40} height={30}/>
                            </button> : null
                        }
                        <div className={styles.images_caroussel}>
                            <ul ref={imagesSlider}>
                                {
                                    projects.map((item)=>{
                                        const {attributes} = item;
                                        return(
                                            <li key={item.id}>
                                                <Image
                                                    src={getStrapiMedia(attributes.image)}
                                                    layout={'fill'}
                                                    objectFit={'contain'}
                                                    objectPosition={'center'}
                                                />
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
