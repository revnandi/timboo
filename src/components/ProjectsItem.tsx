import React from 'react';
import classes from '../scss/ProjectsItem.module.scss';
import Image from '../components/Image';

interface ImageObject {
  src: string,
  lqip: string,
  alt: string
}

interface ProjectObject {
  title?: string
  content?: string
  image: ImageObject
}

type ProjectsItemProps = {
  item: ProjectObject
  index: number
}

function ProjectsItem({ item, index }: ProjectsItemProps) {
  return <div className={ classes.ProjectsItem }>
    <Image src={ item.image.src } lqip={ item.image.lqip } alt={ item.image.alt } width='640' height='435'/>
    <h1 className={ classes.Title }>{ item.title }</h1>
    <div className={ classes.Content }>{ item.content }</div>
  </div>
}

export default ProjectsItem;