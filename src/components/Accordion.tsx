import React, { useState }from 'react';
import AccordionItem from './AccordionItem';
import classes from '../scss/Accordion.module.scss';
import Loader from './Loader';

import { useQuery, gql } from "@apollo/client";

const GET_SERVICES = gql`
  query GetServices {
    services(where: {orderby: {field: DATE, order: ASC}}) {
      nodes {
        id
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
      }
    }
  }
`;

export interface AccordionItemProps {
  id: string
  title: string,
  content: string,
  activeIndex: number,
  featuredImage?: {
    lqip: {
      src: string
    }
    medium: {
      src: string
    }
  },
  index: number,
  handleClick: (index: number) => void
}

const Accordion : React.FC = () => {

  const [selectedIndex, setSelectedIndex] = useState(1);

  const { loading, error, data } = useQuery(GET_SERVICES);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  const accordionData = data.services.nodes;
  // console.log(accordionData);

  const handleClick = (index : number) : void => {
    setSelectedIndex(index);
    return;
  };

  const accordionItems = accordionData.map(({ id, title, content, featuredImage } : AccordionItemProps, index : number) => {
    return <AccordionItem id={ id } title={ title } content={ content } featuredImage={ featuredImage } index={ index + 1 } key={ id } activeIndex={ selectedIndex } handleClick={ handleClick }/>
  })

  return <div className={ classes.Container } id='timboo_services'>
    <h1 className={ classes.Title }>Services</h1>
    <ul className={ classes.List }>
      { accordionItems }
    </ul>
  </div>;
}

export default Accordion;