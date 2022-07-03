import styles from '../Home.module.scss';
import { AppContext } from '../../../pages';

import SVGtwitter from '../../SVG/SVGtwitter';
import SVGgithub from '../../SVG/SVGgithub';
import SVGlinkedin from '../../SVG/SVGlinkedin';

import rehypeRaw from "rehype-raw";
import ReactMarkdown from 'react-markdown';

import Canvas from '../../Canvas/Canvas';
import { useContext } from 'react';

export default function Hero({mainRef}) {
  
    const {intro,socialMedias} = useContext(AppContext);
    return (
    <section className={styles.hero} id="home">
        <div className={styles.contact_links}>
            <ul>
            <li>
                <a href={socialMedias.twitter} target='_blank' rel="noreferrer">
                <SVGtwitter/>
                </a>
            </li>
            <a href={socialMedias.github} target='_blank' rel="noreferrer">
                <li>
                    <SVGgithub/>
                </li>
            </a>
        
            <a href={socialMedias.linkedin} target='_blank' rel="noreferrer">
                <li>
                    <SVGlinkedin/>
                </li>
            </a>
            </ul>
        </div>
        <div className={styles.Short_presentation}>
            <h1>{intro.attributes.title}</h1>
            <ReactMarkdown skipHtml={false} rehypePlugins={[rehypeRaw]}>
                {intro.attributes.content}
            </ReactMarkdown>
        </div>
        <Canvas mainRef={mainRef}/>
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
  )
}
