import React, { useState } from 'react';
import classes from '../scss/Projects.module.scss';
import ProjectsItem from './ProjectsItem';
import Loader from './Loader';

import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetProjects {
    projects(where: {orderby: {field: DATE, order: ASC}}) {
      edges {
        text: node {
          title
          content
        }
        media: node {
          featuredImage {
            lqip: node {
              src: sourceUrl(size: LQIP)
            }
            medium: node {
              src: sourceUrl(size: MEDIUM_LARGE)
            }
          }
          gallery: acf {
            items: gallery {
              lqip: sourceUrl(size: LQIP)
              srcSet(size: MEDIUM)
            }
          }
        }
      }
    }
  }
`;

export interface ProjectItemProps {
  text: ProjectText,
  media: ProjectMedia
}

interface ProjectText {
  title: string,
  content: string,
}

interface ProjectMedia {
  featuredImage?: {
    lqip: {
      src: string
    }
    medium: {
      src: string
    }
    alt: string
  },
  gallery: ProjectGalleryItems
}

interface ProjectGalleryItems {
  items: ProjectGalleryItem[] | null
}

interface ProjectGalleryItem {
  lqip: string,
  srcSet: string
}


const Projects = () => {

  const [errorMessage, setErrorMessage] = useState<string>('')

  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Loader/>;

  if (error) {
    setErrorMessage('Error while loading data');
  };

  const projectsData = data.projects.edges;
  // console.log(projectsData);

  const projectItems = projectsData.map(({ text, media }: ProjectItemProps, index: number) => {
    return <ProjectsItem text={ text } media={ media } key={ index }></ProjectsItem>
  });

  return <React.Fragment>
    <h1 className={ classes.Title }>Projects</h1>
    { errorMessage === '' &&
      <ul className={ classes.Container } id='timboo_projects'>
      { projectItems }
      </ul>
    }
    { errorMessage !== '' &&
      <div>{ errorMessage }</div>
    }
  </React.Fragment>
};

export default Projects;