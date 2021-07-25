import React, { useState } from 'react';
import classes from '../scss/AccordionItem.module.scss';
import { addZeroToSingleDigits, createMarkup } from '../Helpers';

type AccordionItemProps = {
  title: string,
  content: string,
  index: number
}

// let isActive: boolean = true;

// function onChange(e: any) {
//   isActive = true;
//   console.log(e.target.checked)
//   console.log(isActive);
// }

function AccordionItem({ title, content, index }: AccordionItemProps){
    const [isActive, setIsActive] = useState(false);

    return <li
      className={ classes.Container }
      onClick={ () => setIsActive(!isActive) }>
        <div className={ classes.Inner }>
          <div className={ classes.NumberContainer }>
            <div className={ classes.Number }>
            { addZeroToSingleDigits(index) }
            </div>
          </div>
          <div className={ [classes.TextContainer, isActive ? classes.OpenedTextContainer : ''].join(' ') }>
            <div className={ [classes.Content, isActive ? classes.OpenedContent : ''].join(' ') } dangerouslySetInnerHTML={ createMarkup(content) }>
            </div>
            <h2 className={ classes.Title }>{ title }</h2>
          </div>
        </div>
      </li>;
}

export default AccordionItem;