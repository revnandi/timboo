import React from 'react';
import classes from '../scss/ProjectsItem.module.scss';
import Image from '../components/Image';
import Placeholder from './Placeholder';
import ProjectsSwiper from './ProjectsSwiper';

import { ProjectItemProps } from './Projects';

import { createMarkup } from '../Helpers';

const ProjectsItem = ({ text, media }: ProjectItemProps, index: number) => {

  // console.log(media)

  return <li className={ classes.Container } key={ index }>
    { media.gallery && media.gallery.items !== null && 
      <ProjectsSwiper gallery={ media.gallery.items }></ProjectsSwiper>
    }
    { media.gallery.items === null && media.featuredImage && media.featuredImage.medium.src !== '' &&
      <Image src={ media.featuredImage ? media.featuredImage.medium.src : ''} lqip={ media.featuredImage.lqip.src } alt={ media.featuredImage.alt ? media.featuredImage.alt : ''} width='640' height='435' fitted={ true }/>
    }
    { media.gallery.items === null && media.featuredImage === null &&
      <Placeholder></Placeholder>
    }
    <h2 className={ classes.Title }>{ text.title }</h2>
    <div className={ classes.Content } dangerouslySetInnerHTML={ createMarkup(text.content) }></div>
  </li>
}

export default ProjectsItem;