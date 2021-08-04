import React from 'react';
import classes from '../scss/NavigationItem.module.scss';
import { Link } from 'react-scroll'

type NavigationItemProps = {
  title: string,
  link: string,
  index: number,
  onClick: () => void;
}

const NavigationItem : React.FC<NavigationItemProps> = ({ title, link, onClick, index, }: NavigationItemProps) => {
    return <li className={ classes.NavigationItem }>
      <Link className={ classes.Link } to={ 'timboo_' + link } smooth={true}>
        <h2 className={ classes.Title } onClick={ onClick }>{ title }</h2>
      </Link>
    </li>;
}

export default NavigationItem;