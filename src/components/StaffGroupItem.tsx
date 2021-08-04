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
  const [maxContentHeight, setMaxContentHeight] = useState(0);
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    let imageHeight = imageRef?.current?.offsetHeight;
    let nameHeight = nameRef?.current?.offsetHeight;
    let contentHeight = contentRef?.current?.offsetHeight;

    const calculateMaxContentHeight = () : number => {
      let calculatedHeight = 0;
      if(imageHeight && nameHeight) {
        calculatedHeight = imageHeight - nameHeight;
      }
      return calculatedHeight;
    };

    const appendMaxContentHeight = (height : number) : void => {
      if (contentRef && contentRef.current) {
        // console.log(isContentOverflowing);
        contentRef.current.style.maxHeight = height.toString() + 'px';
      }
    };

    const calculateOverflow = () : void => {
      if(contentHeight && imageHeight && nameHeight && ((contentHeight + nameHeight) > imageHeight)) {
        // console.log(`contentHeight > imageHeight: ${(contentHeight + nameHeight) > imageHeight}`);
        setIsContentOverflowing(true);
      } else {
        setIsContentOverflowing(false);
      }
    };

    const handleResize = () : void => {
      imageHeight = imageRef?.current?.offsetHeight;
      nameHeight = nameRef?.current?.offsetHeight;
      contentHeight = contentRef?.current?.offsetHeight;

      calculateOverflow();
      setMaxContentHeight(calculateMaxContentHeight());
      appendMaxContentHeight(calculateMaxContentHeight());
    }

    window.addEventListener('resize', handleResize);

    calculateOverflow();
    setMaxContentHeight(calculateMaxContentHeight());
    appendMaxContentHeight(calculateMaxContentHeight());

  }, [imageRef, nameRef, contentRef]);

  const toggleContentAutoHeight = () : void => {
      if(contentRef && contentRef.current) {

        if(opened) {
          contentRef.current.style.maxHeight = maxContentHeight.toString() + 'px';
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

  // console.log(`isContentOverflowing: ${isContentOverflowing}`);

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
      { isContentOverflowing === true &&
      <div className={ classes.Button } onClick={ clickHandler }>
        <span className={ [classes.ButtonIcon, opened ? classes.FlippedButtonIcon : ''].join(' ') }></span>
      </div>
      }
    </div>
  </li>
}

export default StaffGroupItem;