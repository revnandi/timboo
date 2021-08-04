import React, { useState } from 'react';
import classes from '../scss/AccordionItem.module.scss';
import { addZeroToSingleDigits, createMarkup } from '../Helpers';

type AccordionItemProps = {
  title: string,
  content: string,
  activeIndex: number,
  index: number,
  handleClick: (index: number) => void
}

// let isActive: boolean = true;

// function onChange(e: any) {
//   isActive = true;
//   console.log(e.target.checked)
//   console.log(isActive);
// }

const AccordionItem = ({ title, content, activeIndex, handleClick, index }: AccordionItemProps) => {

  return <li
    className={ classes.Container }
    onClick={ () => handleClick(index) }>
      <div className={ classes.Inner }>
        <div className={ [classes.NumberContainer, (activeIndex === index) ? classes.OpenedNumberContainer : ''].join(' ') }>
          <div className={ classes.Number }>
          { addZeroToSingleDigits(index) }
          </div>
        </div>
        <div className={ [classes.TextContainer, (activeIndex === index) ? classes.OpenedTextContainer : ''].join(' ') }>
          <div className={ [classes.Content, (activeIndex === index) ? classes.OpenedContent : ''].join(' ') } dangerouslySetInnerHTML={ createMarkup(content) }>
          </div>
          <h2 className={ classes.Title }>{ title }</h2>
        </div>
      </div>
    </li>;
};

export default AccordionItem;