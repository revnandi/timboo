import React from 'react';
import classes from '../scss/NavigationButton.module.scss';

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

const Navigation: React.FC<Props> = ({
  onClick,
  isOpen
  }) => {
  return <button onClick={ onClick } className={ [classes.Button, isOpen ? classes.OpenButton : ''].join(' ') }>
      <span></span>
    </button>;
}

export default Navigation;