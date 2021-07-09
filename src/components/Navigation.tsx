import React, { useState } from 'react';
import classes from '../scss/Navigation.module.scss';
import NavigationItem from './NavigationItem';
import NavigationButton from './NavigationButton';

function Navigation () {

  const navigationData = [
    // 'Forest landscape restoration',
    'About & services',
    'Projects',
    'Team',
    'Contact'
  ]

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log('fdf')
    setIsOpen(!isOpen);
  }

  const navigationItems = navigationData.map((title, index)=> {
    return <NavigationItem title={ title } index={ index } key={ index }/>
  })

  return <div className={ [classes.Container, isOpen ? classes.OpenContainer : ''].join(' ') }>
    <div className={ classes.ButtonContainer }>
      <NavigationButton onClick={ handleClick } isOpen={ isOpen }></NavigationButton>
    </div>
    <ul className={ classes.List }>
      { navigationItems }
    </ul>
  </div>;
}

export default Navigation;