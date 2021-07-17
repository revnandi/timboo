import React from 'react';
import classes from '../scss/Projects.module.scss';
import ProjectsItem from './ProjectsItem';
import SeoTitle from './SeoTitle';
import Loader from './Loader';

import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      edges {
        node {
          title
          content
          featuredImage {
            node {
              id
              mediaDetails {
                sizes {
                  name
                  sourceUrl
                  fileSize
                  height
                  width
                }
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;

function Projects() {

  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  console.log(data.projects.edges);

  const formattedResponse = data.projects.edges.map( (item : any) => {
    return {
      title: item.node.title,
      content: item.node.content,
      image: {
        src: '../images/proj4.jpg',
        lqip: '../images/proj4_lqip.jpg',
        alt: 'image placeholder'
      }
    }
  });

  console.log(formattedResponse);

  const projectItems = formattedResponse.map((item : any, index : number) => {
    return <ProjectsItem item={ item } index={ index } key={ index }></ProjectsItem>
  });

  return <React.Fragment>
    <SeoTitle>
      <h1>Projects</h1>
    </SeoTitle>
    <ul className={ classes.Container }>
    { projectItems }
    </ul>
  </React.Fragment>
};

export default Projects;