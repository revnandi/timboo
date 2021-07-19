import React, { useState, useEffect, useRef } from 'react';
import classes from '../scss/StaffGroupItem.module.scss';
import Image from './Image';
import { createMarkup } from '../Helpers'

type StaffMember = {
  title: string,
  content: string,
  featuredImage: {
    lqip: {
      src: string
    },
    medium: {
      src: string
    }
  }
}

const StaffGroupItem = ({ title, content, featuredImage }: StaffMember) => {

  const [opened, setOpened] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    let imageHeight = imageRef?.current?.offsetHeight;
    let nameHeight = nameRef?.current?.offsetHeight;
    let contentHeight = contentRef?.current?.offsetHeight;

    if(contentHeight) {
      setContentHeight(contentHeight);
    }

    const handleResize = () => {
      imageHeight = imageRef?.current?.offsetHeight;
      nameHeight = nameRef?.current?.offsetHeight;
      contentHeight = contentRef?.current?.offsetHeight;

      if(contentHeight) {
        setContentHeight(contentHeight);
      }

      setContentMaxHeight();
    }

    window.addEventListener('resize', handleResize);

    const setContentMaxHeight = () => {
      if(contentRef && contentRef.current && imageHeight && nameHeight) {
        const maxContentHeight = (imageHeight - nameHeight).toString() + 'px';
        contentRef.current.style.maxHeight = maxContentHeight;
      }
    }

    setContentMaxHeight();

  }, [imageRef, nameRef, contentRef]);

  const toggleContentAutoHeight = () => {
      if(contentRef && contentRef.current) {

        if(opened) {
          contentRef.current.style.maxHeight = contentHeight.toString() + 'px';
          contentRef.current.style.paddingBottom = '0.75rem';
        } else {
          contentRef.current.style.maxHeight = '999999999px';
          contentRef.current.style.paddingBottom = '0.75rem';
        }
      };
  };

  const clickHandler = () => {
    toggleContentAutoHeight();
    setOpened(!opened);
  }

  return <li className={ classes.Body }>
    <Image
      ref={ imageRef }
      src={ featuredImage.medium.src }
      data-src={ featuredImage.lqip.src }
      width='320'
      height='320'
      squared={ true }
    />
    <div className={ classes.InnerContainer }>
      <h2 ref={ nameRef } className={ classes.Name }>{ title}</h2>
      <div ref={ contentRef } className={ classes.Content } dangerouslySetInnerHTML={ createMarkup(content) }>
      </div>
      <div className={ classes.Button } onClick={ clickHandler }>
        <span className={ [classes.ButtonIcon, opened ? classes.FlippedButtonIcon : ''].join(' ') }></span>
      </div>
    </div>
  </li>
}

export default StaffGroupItem;