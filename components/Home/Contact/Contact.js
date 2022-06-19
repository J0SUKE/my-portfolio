import styles from '../Home.module.scss';
import { AppContext } from '../../../pages';
import { useContext } from 'react';

import SVGemail from '../../SVG/SVGemail';
import SVGtwitter from '../../SVG/SVGtwitter';
import SVGlinkedin from '../../SVG/SVGlinkedin';


export default function Contact() {
    
    const {socialMedias} = useContext(AppContext);

    return (
    <div className={styles.contact} id="contact">
    <div className={styles.contact__content}>
        <div className={styles.contact__content__left}>
            <img src="/images/programming.svg" alt="" />
        </div>
        <div className={styles.contact__content__right}>
        <h1>Let&apos;s make something great together.</h1>
        <p>You can contact me via social medias or hire me directly on <a href={socialMedias.hire}  target="__blank" rel="noreferrer">malt website</a></p>
        <ul>
            <li>
            <a href={socialMedias.twitter} target="__blank" rel="noreferrer">
                <SVGtwitter/>
            </a>
            </li>
            <li>
            <a href={`mailto:${socialMedias.email}`} target="__blank" rel="noreferrer">
                <SVGemail/>
            </a>
            </li>
            <li>
            <a href={socialMedias.linkedin} target="__blank" rel="noreferrer">
                <SVGlinkedin/>
            </a>                        
            </li>
        </ul>
        </div>
        
        
    </div>
    <div className={styles.copyright}>
        <p>© 2022 Jean Mazouni. All Rights Reserved.</p>
        </div>
    </div>
  )
}
