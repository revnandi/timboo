import React from 'react';
import classes from '../scss/Header.module.scss';

type Props = {
  children?: React.ReactNode;
}

function Header(props: Props) {
  return <header className={ classes.Container } id='timboo_header'>
    {props.children}
  </header>
}

export default Header;