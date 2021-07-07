import React from 'react';
import classes from '../scss/Image.module.scss';
// eslint-disable-next-line
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

type ImageProps = {
  src?: string
  lqip?: string,
  alt?: string,
  width: string,
  height: string
}

function Image({ src, lqip, alt, width, height }: ImageProps) {
  return <div className={ classes.Container }>
    <img className={ [classes.Image, 'lazyload', 'blur-up' ].join(' ') } src={ lqip } data-src={ src } alt={ alt } width={ width } height={ height } />
  </div>
}

export default Image;