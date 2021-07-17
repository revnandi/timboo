import React, { useState } from 'react';
import classes from '../scss/AccordionItem.module.scss';
import { addZeroToSingleDigits } from '../Helpers';

type AccordionItemProps = {
  title: string,
  index: number
}

// let isActive: boolean = true;

// function onChange(e: any) {
//   isActive = true;
//   console.log(e.target.checked)
//   console.log(isActive);
// }

function AccordionItem({ title, index }: AccordionItemProps){
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
            <div className={ [classes.Content, isActive ? classes.OpenedContent : ''].join(' ') }>
            The SI Agroprocessing aims to support the Ethiopian government in mitigating the impact of the corona pandemic on the economy, for example by protecting jobs in the textile and agroprocessing sector. In that context, GIZ would support the production of 20,000 camp beds. These are to be used in local hospitals, health stations or newly established corona centers (e.g. Millennium Hall Addis) for the increased demand in times of corona pandemics. In the future, however, there will also be a large local sales market. 
            </div>
            <h2 className={ classes.Title }>{ title }</h2>
          </div>
        </div>
      </li>;
}

export default AccordionItem;