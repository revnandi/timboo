import React from 'react';
import AccordionItem from './AccordionItem';
import classes from '../scss/Accordion.module.scss';

const accordionData = [
  'Forest landscape restoration',
  'Test 2',
  'Test 3',
  'Test 4',
  'Test 5'
]

const Accordion: React.FC = () => {

    const accordionItems = accordionData.map((title, index) => {
      return <AccordionItem title={ title } index={ index + 1 } key={ index } />
    })

    return <ul className={ classes.List }>
      { accordionItems }
    </ul>;
}

export default Accordion;