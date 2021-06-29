import React from 'react';
import classes from '../scss/Header.module.scss';

type Props = {
  children?: React.ReactNode;
}

function Header(props: Props) {
  return <header className={ classes.Header }>
    {props.children}
  </header>
}

export default Header;