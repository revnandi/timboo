import React from 'react';
import classes from '../scss/Loader.module.scss';

function Loader() {
  return <div className={ classes.Container }>
    <div className={ classes.Inner }></div>
  </div>
}

export default Loader;