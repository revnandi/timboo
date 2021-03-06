import React from 'react';
import classes from '../scss/About.module.scss';
import Loader from './Loader';
import { createMarkup } from '../Helpers';

import { useQuery, gql } from "@apollo/client";

const GET_ABOUT = gql`
  query GetAbout {
    pageBy(uri: "/home/") {
      id
      content(format: RENDERED)
    }
  }
`;

const About = () => {

  const { loading, error, data } = useQuery(GET_ABOUT);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  const content = data.pageBy.content;

  return <div className={ classes.Container } id='timboo_about'>
    <div className={ classes.Inner } dangerouslySetInnerHTML={ createMarkup(content) }>
    </div>
  </div>
}

export default About;