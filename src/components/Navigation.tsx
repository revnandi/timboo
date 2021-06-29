import React from 'react';
import classes from '../scss/Navigation.module.scss';
import NavigationItem from './NavigationItem';

const navigationData = [
  // 'Forest landscape restoration',
  'About & services',
  'Projects',
  'Team',
  'Contact'
]

const navigationItems = navigationData.map((title, index)=> {
  return <NavigationItem title={ title } index={ index } key={ index }/>
})

class Navigation extends React.Component {
  render() {
    return <ul className={ classes.Navigation }>
      { navigationItems }
    </ul>;
  }
}

export default Navigation;