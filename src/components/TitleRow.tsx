import React from 'react';

import classes from '../scss/TitleRow.module.scss';

interface Props {
  text: string
}

const TitleRow = ({ text }: Props) => {
  return <div className={ classes.Container }>
    <h1 className={ classes.Text }>{text}</h1>
  </div>
};

export default TitleRow;