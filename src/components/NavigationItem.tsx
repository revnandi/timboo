import React from 'react';
import classes from '../scss/NavigationItem.module.scss';

type NavigationItemProps = {
  title: string,
  index: number
}

function NavigationItem({ title, index }: NavigationItemProps){
    return <li className={ classes.NavigationItem }>
      <h2 className={ classes.Title }>{ title }</h2>
    </li>;
}

export default NavigationItem;