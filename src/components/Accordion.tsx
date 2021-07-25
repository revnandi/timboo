import React from 'react';
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
      }
    }
  }
`;

type AccordionItemProps = {
  id: string
  title: string,
  content: string,
}

const Accordion: React.FC = () => {

  const { loading, error, data } = useQuery(GET_SERVICES);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  console.log(data.services.nodes);

  const accordionItemsData = data.services.nodes.map((item : any) => {
    return {
      id: item.id,
      title: item.title,
      content: item.content
    }
  });

  const accordionItems = accordionItemsData.map(({ id, title, content } : AccordionItemProps, index : number) => {
    return <AccordionItem title={ title } content={ content } index={ index + 1 } key={ id } />
  })

  return <ul className={ classes.List }>
    { accordionItems }
  </ul>;
}

export default Accordion;