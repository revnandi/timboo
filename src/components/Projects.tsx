import React from 'react';
import classes from '../scss/Projects.module.scss';
import ProjectsItem from './ProjectsItem';
import SeoTitle from './SeoTitle';
import Loader from './Loader';

import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetProjects {
    projects(where: {orderby: {field: DATE, order: ASC}}) {
      edges {
        node {
          title
          content
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

interface ProjectsData {
  title: string,
  content: string,
  image: {
    src: string,
    lqip: string,
    alt: string
  },
  gallery: object[]
}

const Projects = () => {

  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  // console.log(data.projects.edges);

  const formattedResponse = data.projects.edges.map((item : any) => {
    return {
      title: item.node.title,
      content: item.node.content,
      image: {
        src: item.node.featuredImage.medium.src,
        lqip: item.node.featuredImage.lqip.src,
        alt: 'image placeholder'
      },
      gallery: item.node.gallery.items
    }
  });

  // console.log(formattedResponse);

  const projectItems = formattedResponse.map((item : ProjectsData, index : number) => {
    return <ProjectsItem item={ item } index={ index } key={ index }></ProjectsItem>
  });

  return <React.Fragment>
    <SeoTitle>
      <h1>Projects</h1>
    </SeoTitle>
    <ul className={ classes.Container } id='timboo_projects'>
    { projectItems }
    </ul>
  </React.Fragment>
};

export default Projects;