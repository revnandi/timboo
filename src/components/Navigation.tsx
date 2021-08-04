import React, { useState } from 'react';
import classes from '../scss/Navigation.module.scss';
import NavigationItem from './NavigationItem';
import NavigationButton from './NavigationButton';
import { link } from 'fs';

interface navigationItemProps {
  title: string,
  link: string
}

const Navigation = () => {

  const navigationData = [
    {
      title: 'About & services',
      link: 'about'
    },
    {
      title: 'Projects',
      link: 'projects'
    },
    {
      title: 'Team',
      link: 'staff'
    },
    {
      title: 'Contact',
      link: 'contact'
    }
  ]

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const navigationItems = navigationData.map(({ title, link }: navigationItemProps, index : number)=> {
    return <NavigationItem title={ title } link={ link } index={ index } key={ index } onClick={ handleClick }/>
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