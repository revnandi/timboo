import React from 'react';
import classes from '../scss/Hero.module.scss';
import HeroItem from './HeroItem';

function Hero() {
  return <div className={ classes.Hero }>
    <HeroItem></HeroItem>
  </div>
}

export default Hero;