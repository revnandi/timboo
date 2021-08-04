import React from 'react';
import classes from '../scss/ProjectsItem.module.scss';
import Image from '../components/Image';
import ProjectsSwiper from './ProjectsSwiper';

import { createMarkup } from '../Helpers';

interface ImageObject {
  src: string,
  lqip: string,
  alt: string
}

interface ProjectObject {
  title: string
  content: string
  image: ImageObject,
  gallery: object[] | null
}

type ProjectsItemProps = {
  item: ProjectObject
  index: number
}

const ProjectsItem = ({ item, index }: ProjectsItemProps) => {
  return <li className={ classes.Container } key={ index }>
    { item.gallery != null && 
      <ProjectsSwiper gallery={ item.gallery }></ProjectsSwiper>
    }
    { item.gallery === null &&
      <Image src={ item.image.src } lqip={ item.image.lqip } alt={ item.image.alt } width='640' height='435' fitted={ true }/>
    }
    <h2 className={ classes.Title }>{ item.title }</h2>
    <div className={ classes.Content } dangerouslySetInnerHTML={ createMarkup(item.content) }></div>
  </li>
}

export default ProjectsItem;