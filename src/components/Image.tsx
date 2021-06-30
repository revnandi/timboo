import React from 'react';
import classes from '../scss/Image.module.scss';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

type ImageProps = {
  src?: string
  lqip?: string,
  alt?: string
}

function Image({ src, lqip, alt }: ImageProps) {
  return <div className={ classes.Container }>
    <img className={ [classes.Image, 'lazyload', 'blur-up' ].join(' ') } src={ lqip } data-src={ src } alt={ alt } width='640' height='435' />
  </div>
}

export default Image;