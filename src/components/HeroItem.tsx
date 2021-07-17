import React from 'react';
import classes from '../scss/HeroItem.module.scss';
import { addZeroToSingleDigits, createMarkup } from '../Helpers';

type Props = {
  index: number,
  title: string,
  content: string,
}

function HeroItem({ index, title, content }: Props) {
  return <div className={ classes.Container }>
    <div className={ classes.IdContainer } >
      <div className={ classes.Id }>{ addZeroToSingleDigits(index) }</div>
    </div>
    <div className={ classes.Inner } >
      <div className={ classes.Description } dangerouslySetInnerHTML={ createMarkup(content) }>
      </div>
      <h2 className={ classes.Title }>{ title }</h2>
    </div>
  </div>
}

export default HeroItem;