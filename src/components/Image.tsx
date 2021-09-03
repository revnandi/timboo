import React, { forwardRef } from 'react';
import classes from '../scss/Image.module.scss';
// eslint-disable-next-line
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

type Props = {
  src?: string
  lqip?: string,
  alt?: string,
  width?: string,
  height?: string,
  squared?: boolean,
  fitted?: boolean,
  hero?: boolean,
  standing?: boolean,
  srcSet?: string,
  animated?: boolean,
  currentSlideIndex?: number,
  ownIndex?: number,
  delayedSlideIndex?: number,
  passedChangeEndedEvent?: (this: any, slideIndex: number, ownIndex: number) => void,
}

const Image = forwardRef<HTMLImageElement, Props>(({ src, lqip, alt, width, height, squared, fitted, hero, standing, animated, srcSet, ownIndex, currentSlideIndex, delayedSlideIndex, passedChangeEndedEvent }, ref) => {

  return <div className={ [classes.Container, squared ? classes.SquareContainer : '', fitted ? classes.FittedContainer : '', hero ? classes.heroContainer : '', standing ? classes.StandingContainer : '' ].join(' ') }>
    <img
      ref={ref}
      className={ [classes.Media, 'lazyload', 'blur-up', ((fitted || squared) ? classes.FittedImage : ''), hero ? classes.HeroImage : '', standing ? classes.StandingImage : '', (hero &&(currentSlideIndex === ownIndex || delayedSlideIndex === ownIndex)) ? classes.AnimatedImage : '' ].join(' ') }
      src={ lqip }
      data-src={ src }
      data-srcset={ srcSet }
      alt={ alt ? alt : '' }
      width={ width }
      height={ height }
    />
  </div>
});

Image.defaultProps = {
  squared: false
}

export default Image;