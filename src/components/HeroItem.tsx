import React from 'react';
import classes from '../scss/HeroItem.module.scss';

function HeroItem() {
  return <div className={ classes.Container }>
    <div className={ classes.IdContainer } >
      <div className={ classes.Id }>01</div>
    </div>
    <div className={ classes.Inner } >
      <div className={ classes.Description }>
        <p>Silviculture and Bamboo</p>
        <p>plantation management,</p>
        <p>training, processing</p>
        <p>and architectural planning</p>
      </div>
      <h2 className={ classes.Title }>Forest landscape restoration</h2>
    </div>
  </div>
}

export default HeroItem;