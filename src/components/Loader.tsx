import React from 'react';
import classes from '../scss/Loader.module.scss';

interface Props {
  centered?: boolean
}

function Loader({ centered }: Props ) {
  return <div className={ [classes.Container, centered ? classes.CenteredContainer : ''].join(' ') }>
    <div className={ classes.Inner }></div>
  </div>
}

export default Loader;