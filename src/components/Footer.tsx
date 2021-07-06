import React from 'react';
import classes from '../scss/Footer.module.scss';

function Footer() {
  return <footer className={ classes.Footer }>
    <div className={ classes.Item }>
      <h2 className={ classes.Title }>Contact</h2>
    </div>
    <div className={ classes.Item }>
      <a className={ classes.Address } href='mailto:info@timboo.org'>info@timboo.org</a>
    </div>
  </footer>
}

export default Footer;