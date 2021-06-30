import React from 'react';
import classes from '../scss/Hero.module.scss';
import HeroItem from './HeroItem';

function Hero() {
  return <div className={ classes.Hero }>
    <div className={ classes.VimeoWrapper }>
      <iframe
        className={ classes.Iframe   }
        src='https://player.vimeo.com/video/541719840?autoplay=1&loop=1&title=0&byline=0&portrait=0?background=1?muted=1'
        frameBorder='false'
        data-allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen={true}>
      </iframe>
    </div>
    <HeroItem></HeroItem>
  </div>
}

export default Hero;