import React from 'react';
import classes from '../scss/Section.module.scss';

type Props = {
  children?: React.ReactNode;
};

function Section({ children }: Props) {
  return <section className={ classes.Section }>
    { children }
    </section>
}

export default Section;