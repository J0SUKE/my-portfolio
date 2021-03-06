import Head from 'next/head'
import Layout from '../components/Layout/Layout';
import React from 'react';
import fetchAPI from '../lib/api'

export const AppContext = React.createContext();

export default function Home({about,skills,projects,intro,socialMedias}) {
  
  let AppContextValue = {
    about,
    skills,
    projects,
    intro,
    socialMedias
  }

  return (
      <>
        <Head>
          <title>jean Mazouni - Homepage</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <AppContext.Provider value={AppContextValue}>
          <Layout about={about}/>
        </AppContext.Provider>
        
      </>
  )
}


export async function getStaticProps() {
    
  const aboutQuery = await fetchAPI('/about',{
    populate:'*'
  });
  
  const skillsQuery = await fetchAPI('/skill-categories',{
    populate: {
      skills: {
        populate: ['image'],
      }
    },
    sort:['id:asc']
  })

  const projectsQuery = await fetchAPI('/projects',{
    populate:['image'],
    sort:['id:desc']
  })

  const introQuery = await fetchAPI('/intro');

  let socialMedias= await fetchAPI('/social-medias');
  socialMedias = socialMedias.data;
  socialMedias = socialMedias.map(({attributes})=>{
    return (
      {
        name : attributes.name,
        link : attributes.link
      }
    )
    })
  let socialMediasObj = {}
  socialMedias.forEach(element => {
    socialMediasObj[element.name] = element.link
  });

  socialMedias = socialMediasObj;

  let intro = introQuery.data;
  let about = aboutQuery.data;
  let skills = skillsQuery.data;
  let projects = projectsQuery.data;

  
  return {
    props: {
      about,skills,projects,intro,socialMedias
    },
    revalidate: 10,
  }
}
