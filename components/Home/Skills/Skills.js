import React from 'react'
import styles from '../Home.module.scss';

import { getStrapiMedia } from '../../../lib/media';
import { AppContext } from '../../../pages';
import { useContext, useEffect, useRef } from 'react';

import SVGwave from '../../SVG/SVGwave';

export default function Skills() {
  
    const [line1,line2,line3,skillsTitls,p] = useObserveSkills(styles.active);
    const lines = [line1,line2,line3]; // chaque line correspond a une categorie (frontend , backend , soft)
    
    const {skills} = useContext(AppContext);

    return (
    <section className={styles.skills}>
        <div className={styles.skills__content_container} id="skills">
            <div className={styles.skills__content}>
              <h1 ref={skillsTitls}>Web Technologies & Soft skills</h1>
              <div ref={p}>
                <p>As someone who loves discovering new technologies, I am not afraid of learning new tools on the go as I think it is very important to use the right tool for the right task. I am also a fast learner, so I can adapt to any stack without any language or framework barriers.<br/><br/>
                Here are some tech-tools and libraries I am good at</p>
              </div>

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
        
        <SVGwave/>
    </section>
  )
}



function useObserveSkills(activeClass) {
    const line1 = useRef();
    const line2 = useRef();
    const line3 = useRef();
    const skillsTitls = useRef();
    const p = useRef();
  
  
    const entries = [line1,line2,line3,skillsTitls,p];
  
    useEffect(()=>{
        let observer = new IntersectionObserver((entries)=>{
          entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(activeClass);
            }
          });  
            
        },{
          threshold:0.5
        })
  
        if (line1 && line2 && line3) {
            entries.forEach(element => {
              observer.observe(element.current);  
          });  
        }
        
        
        
    },[line1,line2,line3,skillsTitls,p])
  
  
    return [line1,line2,line3,skillsTitls,p];
  }