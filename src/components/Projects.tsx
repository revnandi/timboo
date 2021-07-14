import React from 'react';
import classes from '../scss/Projects.module.scss';
import ProjectsItem from './ProjectsItem';
import SeoTitle from './SeoTitle';

const projectsData = [
  {
    title: 'Ethiopia bamboo plantation management',
    content: 'Client: Deutsche Geselleschaft für Internationale Zusammenarbeit (GIZ) Managing the selection and harvest of ethiopian highland bamboo',
    image: {
      src: '../images/proj1.jpg',
      lqip: '../images/proj1_lqip.jpg',
      alt: 'image placeholder'
    }
  },
  {
    title: 'Ethiopia bamboo treatment',
    content: 'Client: Deutsche Geselleschaft für Internationale Zusammenarbeit (GIZ) establishing treatment facilities, treatment management.',
    image: {
      src: '../images/proj2.jpg',
      lqip: '../images/proj2_lqip.jpg',
      alt: 'image placeholder'
    }
  },
  {
    title: 'Ethiopia bamboo plantation management',
    content: 'Client: Deutsche Geselleschaft für Internationale Zusammenarbeit (GIZ) Managing the selection and harvest of ethiopian highland bamboo',
    image: {
      src: '../images/proj3.jpg',
      lqip: '../images/proj3_lqip.jpg',
      alt: 'image placeholder'
    }
  },
  {
    title: 'Ethiopia bamboo treatment',
    content: 'Client: Deutsche Geselleschaft für Internationale Zusammenarbeit (GIZ) Special Initiative on Training and Job Creation Trainings- to- Trainers to factory supervisors to produce camp beds from Bamboo. The SI Agroprocessing aims to support the Ethiopian government in mitigating the impact of the corona pandemic on the economy, for example by protecting jobs in the textile and agroprocessing sector. In that context, GIZ would support the production of 20,000 camp beds. These are to be used in local hospitals, health stations or newly established corona centers (e.g. Millennium Hall Addis) for the increased demand in times of corona pandemics. In the future, however, there will also be a large local sales market. Many families in rural areas',
    image: {
      src: '../images/proj4.jpg',
      lqip: '../images/proj4_lqip.jpg',
      alt: 'image placeholder'
    }
  }
]

const projectItems = projectsData.map((item, index) => {
  return <ProjectsItem item={ item } index={ index } key={ index }></ProjectsItem>
})

function Projects() {
  return <React.Fragment>
    <SeoTitle>
      <h1>Projects</h1>
    </SeoTitle>
    <ul className={ classes.Container }>
    { projectItems }
    </ul>
  </React.Fragment>
}

export default Projects;