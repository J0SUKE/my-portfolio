import styles from '../Home.module.scss';

import { getStrapiMedia } from '../../../lib/media';
import { AppContext } from '../../../pages';
import { useContext, useEffect, useRef } from 'react';

import rehypeRaw from "rehype-raw";
import ReactMarkdown from 'react-markdown';

export default function About() {
  
    const {about} = useContext(AppContext);

    const presentationText = useRef();
    const presentationImg = useRef();

    useEffect(()=>{
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
  
    return (
    <section id="about" className={styles.presentation} >
        <h1>About</h1>
        <div className={styles.presentation__content}>
            <div className={styles.presentation__content__img} ref={presentationImg}>
                <img src={getStrapiMedia(about.attributes.image)} alt="" />
            </div>
            <div className={styles.presentation__content__text} ref={presentationText}>
                <ReactMarkdown skipHtml={false} rehypePlugins={[rehypeRaw]} >
                    {about.attributes.content}
                </ReactMarkdown>
            </div>
        </div>
    </section>
  )
}
