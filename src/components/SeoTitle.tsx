import React from 'react';
import classes from '../scss/SeoTitle.module.scss';

type Props = {
  children?: React.ReactNode;
};

function SeoTitle({ children }: Props) {
  return <div className={ classes.Container }>
    { children }
    </div>
}

export default SeoTitle;