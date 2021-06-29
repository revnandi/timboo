import React from 'react';
import classes from '../scss/AccordionItem.module.scss';

type AccordionItemProps = {
  title: string,
  index: number
}

function AccordionItem({ title, index }: AccordionItemProps){
    return <li className={ classes.AccordionItem }>
      <h2 className={ classes.Title }>{ title }</h2>
    </li>;
}

export default AccordionItem;