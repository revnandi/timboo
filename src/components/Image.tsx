import React, { forwardRef } from 'react';
import classes from '../scss/Image.module.scss';
// eslint-disable-next-line
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import { useWebPSupportCheck } from 'react-use-webp-support-check';

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

  const supportsWebP = useWebPSupportCheck();

  if(src) {
    return <div className={ [classes.Container, squared ? classes.SquareContainer : '', fitted ? classes.FittedContainer : '', hero ? classes.heroContainer : '', standing ? classes.StandingContainer : '' ].join(' ') }>
    <img
      ref={ ref }
      className={ [classes.Media, 'lazyload', 'blur-up', ((fitted || squared) ? classes.FittedImage : ''), hero ? classes.HeroImage : '', standing ? classes.StandingImage : '', (hero &&(currentSlideIndex === ownIndex || delayedSlideIndex === ownIndex)) ? classes.AnimatedImage : '' ].join(' ') }
      src={ supportsWebP ? lqip?.replace('/wp-content/uploads/', '/wp-content/uploads-webpc/uploads/') + '.webp' : lqip }
      data-src={ supportsWebP ? src?.replace('/wp-content/uploads/', '/wp-content/uploads-webpc/uploads/') + '.webp' : src }
      alt={ alt ? alt : '' }
      width={ width }
      height={ height }
    />
  </div>
  } else {
    return <div className={ [classes.Container, squared ? classes.SquareContainer : '', fitted ? classes.FittedContainer : '', hero ? classes.heroContainer : '', standing ? classes.StandingContainer : '' ].join(' ') }>
      <img
        ref={ ref }
        className={ [classes.Media, 'lazyload', 'blur-up', ((fitted || squared) ? classes.FittedImage : ''), hero ? classes.HeroImage : '', standing ? classes.StandingImage : '', (hero &&(currentSlideIndex === ownIndex || delayedSlideIndex === ownIndex)) ? classes.AnimatedImage : '' ].join(' ') }
        data-srcset={ supportsWebP ? srcSet?.replaceAll('/wp-content/uploads/', '/wp-content/uploads-webpc/uploads/').replaceAll('.jpg ', '.jpg.webp ').replaceAll('.jpeg ', '.jpeg.webp ').replaceAll('.png ', '.png.webp ') : srcSet }
        alt={ alt ? alt : '' }
        width={ width }
        height={ height }
      />
    </div>
  }
});

Image.defaultProps = {
  squared: false
}

export default Image;