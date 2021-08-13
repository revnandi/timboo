import React, { forwardRef } from 'react';
import classes from '../scss/Image.module.scss';
// eslint-disable-next-line
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

type ImageProps = {
  src?: string
  lqip?: string,
  alt?: string,
  width?: string,
  height?: string,
  squared?: boolean,
  fitted?: boolean,
  hero?: boolean,
  standing?: boolean,
  srcSet?: string
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ src, lqip, alt, width, height, squared, fitted, hero, standing, srcSet }, ref) => {
  return <div className={ [classes.Container, squared ? classes.SquareContainer : '', fitted ? classes.FittedContainer : '', hero ? classes.heroContainer : '', standing ? classes.StandingContainer : '' ].join(' ') }>
    <img
      ref={ref}
      className={ [classes.Media, 'lazyload', 'blur-up', ((fitted || squared) ? classes.FittedImage : ''), hero ? classes.HeroImage : '', standing ? classes.StandingImage : '' ].join(' ') }
      src={ lqip }
      data-src={ src }
      data-srcset={ srcSet }
      alt={ alt }
      width={ width }
      height={ height }
    />
  </div>
});

Image.defaultProps = {
  squared: false
}

export default Image;