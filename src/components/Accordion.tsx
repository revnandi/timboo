import React from 'react';
import AccordionItem from './AccordionItem';
import classes from '../scss/Accordion.module.scss';

const accordionData = [
  'Forest landscape restoration',
  'About & services',
  'Projects',
  'Team',
  'Contact'
]

const accordionItems = accordionData.map((title, index)=> {
  return <AccordionItem title={ title } index={ index } />
})

class Accordion extends React.Component {
  render() {
    return <ul className={ classes.Accordion }>
      { accordionItems }
    </ul>;
  }
}

export default Accordion;