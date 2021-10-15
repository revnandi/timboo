import React from 'react';
import classes from '../scss/AccordionItem.module.scss';
import Image from './Image';
import { addZeroToSingleDigits, createMarkup } from '../Helpers';
import { AccordionItemProps } from './Accordion';

const AccordionItem = ({ title, content, featuredImage, activeIndex, handleClick, index }: AccordionItemProps) => {

  return <li
    className={ classes.Container }
    onClick={ () => handleClick(index) }>
      <div className={ classes.Inner }>
        <div className={ [classes.NumberContainer, (activeIndex === index) ? classes.OpenedNumberContainer : ''].join(' ') }>
        <h2 className={ [classes.Title, classes.VerticalTitle].join(' ') }>{ title }</h2>
          <div className={ classes.Number }>
          { addZeroToSingleDigits(index) }
          </div>
        </div>
        <div className={ [classes.ContentAndImageContainer, (activeIndex === index) ? classes.OpenedContentAndImageContainer : ''].join(' ') }>
          <div className={ [classes.TextContainer, (activeIndex === index) ? classes.OpenedTextContainer : '', featuredImage === null ? classes.fullWidthTextContainer : ''].join(' ') }>
            <div className={ [classes.Content, (activeIndex === index) ? classes.OpenedContent : ''].join(' ') } dangerouslySetInnerHTML={ createMarkup(content) }>
            </div>
            <h2 className={ classes.Title }>{ title }</h2>
          </div>
          { featuredImage &&
            <div className={ [classes.ImageContainer, (activeIndex === index) ? classes.OpenedImageContainer : '' ].join(' ') }>
              <Image
                width={ featuredImage.lqip.mediaDetails.width.toString() }
                height={ featuredImage.lqip.mediaDetails.height.toString() }
                src={ featuredImage.medium.src ? featuredImage.medium.src : '' }
                lqip={ featuredImage.lqip ? featuredImage.lqip.src : '' }
                standing
              />
            </div>
          }
        </div>
      </div>
    </li>;
};

export default AccordionItem;