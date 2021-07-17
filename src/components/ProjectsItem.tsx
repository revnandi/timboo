import React from 'react';
import classes from '../scss/ProjectsItem.module.scss';
import Image from '../components/Image';

import { createMarkup } from '../Helpers';

interface ImageObject {
  src: string,
  lqip: string,
  alt: string
}

interface ProjectObject {
  title: string
  content: string
  image: ImageObject
}

type ProjectsItemProps = {
  item: ProjectObject
  index: number
}

function ProjectsItem({ item, index }: ProjectsItemProps) {
  return <li className={ classes.Container }>
    <Image src={ item.image.src } lqip={ item.image.lqip } alt={ item.image.alt } width='640' height='435'/>
    <h2 className={ classes.Title }>{ item.title }</h2>
    <div className={ classes.Content } dangerouslySetInnerHTML={ createMarkup(item.content) }></div>
  </li>
}

export default ProjectsItem;