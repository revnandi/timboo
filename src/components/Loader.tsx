import React from 'react';
import classes from '../scss/Loader.module.scss';

interface Props {
  centered?: boolean
  hero?: boolean
}

function Loader({ centered, hero }: Props ) {
  return <div className={ [classes.Container, centered ? classes.CenteredContainer : '', hero ? classes.HeroContainer : ''].join(' ') }>
    <div className={ classes.Inner }></div>
  </div>
}

export default Loader;