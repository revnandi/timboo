import React, { useEffect, useRef } from 'react';
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

  const imageRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageHeight = imageRef?.current?.offsetHeight;
    const nameHeight = nameRef?.current?.offsetHeight;
    const contentHeight = contentRef?.current?.offsetHeight;

    console.log('Image height', imageHeight);
    console.log('Name height', nameHeight);
    console.log('Content height', contentHeight);
    
    if(contentRef && contentRef.current && imageHeight && nameHeight) {
      const maxContentHeight = (imageHeight - nameHeight).toString() + 'px';
      console.log(maxContentHeight);
      contentRef.current.style.maxHeight = maxContentHeight;
    }

  }, [imageRef, nameRef, contentRef]);

  return <li className={ classes.Body }>
    <Image
      ref={ imageRef }
      src={ featuredImage.medium.src }
      data-src={ featuredImage.lqip.src }
      width='320'
      height='320'
    />
    <div className={ classes.InnerContainer }>
      <h2 ref={ nameRef } className={ classes.Name }>{ title}</h2>
      <div ref={ contentRef } className={ classes.Content } dangerouslySetInnerHTML={ createMarkup(content) }></div>
    </div>
  </li>
}

export default StaffGroupItem;