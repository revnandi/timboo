import React from 'react';
import classes from '../scss/HeroItem.module.scss';
import { addZeroToSingleDigits } from '../Helpers';

type Props = {
  index: number,
  title: string,
  isAnimated: boolean
}

function HeroItem({ index, title, isAnimated}: Props) {
  return <div className={ classes.Container }>
    <div className={ classes.IdContainer } >
      <div className={ classes.Id }>{ addZeroToSingleDigits(index) }</div>
    </div>
    <div className={ classes.Inner } >
      <h2 className={ [classes.Title, isAnimated ? classes.TitleVisible: ''].join(' ') }>{ title }</h2>
    </div>
  </div>
}

export default HeroItem;