import React from 'react'
import styles from '../Home.module.scss';
import Image from 'next/image';

import { getStrapiMedia } from '../../../lib/media';
import { AppContext } from '../../../pages';
import { useContext, useEffect, useRef } from 'react';

import SVGwave from '../../SVG/SVGwave';

export default function Skills() {
  
    const [addElement] = useObserveSkills(styles.active);
    
    const {skills} = useContext(AppContext);

    return (
    <section className={styles.skills}>
        <div className={styles.skills__content_container} id="skills">
            <div className={styles.skills__content}>
              <h1 ref={addElement}>Web Technologies & Soft skills</h1>
              <div ref={addElement}>
                <p>As someone who loves discovering new technologies, I am not afraid of learning new tools on the go as I think it is very important to use the right tool for the right task. I am also a fast learner, so I can adapt to any stack without any language or framework barriers.<br/><br/>
                Here are some tech-tools and libraries I am good at</p>
              </div>

              <section>
              {
                skills.map((item)=>{
                  const {attributes:{skills:{data}}} = item;
                  return (
                  <ul key={item.id}>
                    {
                      data.map((item)=>{
                          const {attributes} = item;
                          return (
                          <li ref={addElement} key={item.id}>
                              <img loading="lazy" src={getStrapiMedia(attributes.image)} alt="" />
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
    const skillsElements = useRef([]);

    function addElement(el) {
      if (el && !skillsElements.current.includes(el)) 
      {
          skillsElements.current.push(el);
      }
    }
  
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
  
        skillsElements.current.forEach(element => {
          observer.observe(element);  
        });  
        
        
        
    },[skillsElements])
  
  
    return [addElement];
  }