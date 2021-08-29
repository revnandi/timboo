import React, { useState, useRef, Fragment } from 'react';
import classes from '../../scss/Hero.module.scss';
import HeroItem from '../HeroItem';
import Image from '../Image';
import Video from '../Video';
import Loader from '../Loader';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from "@apollo/client";
import { GET_CAROUSEL } from './query';

import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([EffectFade, Autoplay]);

interface SliderItem {
  content: string,
  gallery: SliderGalleryItem[],
  slideIndex: number,
  title: string
}

interface SliderGalleryItem {
  id: string,
  lqip: string,
  mediaItemUrl: string,
  mimeType: string,
  slideId: number,
  src: string,
  customLength: null | number
}

interface Category {
  title: string,
  content: string,
  slideIndex: number,
}

const Hero = () => {

  const swiperRef: any = useRef(null);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  const initSwiper = () => {
    // console.log(swiperRef.current);
    setCurrentActiveIndex(swiperRef.current.activeIndex);
  };

  const { loading, error, data } = useQuery(GET_CAROUSEL);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;


  const formattedResponse: Array<SliderItem> = data.themeGeneralSettings.hero.carousel.item.map((item : SliderItem, index: number) => {

    return {
      ...item,
      slideIndex: index,
      gallery: item.gallery.map((item: SliderGalleryItem) => {
        return {
          ...item,
          slideId: index
        }
      }),
    };
  });

  console.log(formattedResponse);

  const categories: Array<Category> = formattedResponse.map((item: Category) => {
    return {
      title: item.title,
      content: item.content,
      slideIndex: item.slideIndex
    }
  });

  const galleries: Array<any> = formattedResponse.map((item : SliderItem) => {

    return item.gallery;
  });

  const mergedSlides = [].concat.apply([], galleries)

  
  const handleEndedEvent = (index: number, player: any): void => {
    player.seekTo(0);
  };

  const handleReadyEvent = (currentIndex : number, index: number, player: any): void => {

  };

  const slides = mergedSlides.map((item: SliderGalleryItem, index: number) => {

    return <SwiperSlide className={ classes.Slide } key={ index } data-swiper-autoplay={ item.customLength ? (item.customLength - 500 ) : '' }>
      {({ isActive }) => (
        (item.mimeType === 'image/jpeg' || item.mimeType === 'image/png' || item.mimeType === 'image/jpg') ? 
        <Fragment>
          <HeroItem title={ categories[item.slideId].title } content={ categories[item.slideId].content } index={ item.slideId + 1 }/>
          <Image animated={ isActive } src={ item.mediaItemUrl } lqip={ item.lqip } alt='' hero/>
        </Fragment>
        : 
        (item.mimeType === 'video/mp4') ?
        <Fragment>
          <HeroItem title={ categories[item.slideId].title } content={ categories[item.slideId].content } index={ item.slideId + 1 }/>
          <Video src={ item.mediaItemUrl } passedEndedEvent={ handleEndedEvent } passedReadyEvent={ handleReadyEvent } currentIndex={ currentActiveIndex } index={ index }></Video>
        </Fragment>
        : ''
      )}
    </SwiperSlide>
  });

  return <div className={ classes.Hero }>
    {/* { heroItems } */}
    <Swiper
      className={ classes.Swiper }
      slidesPerView={1}
      allowTouchMove={ false }
      effect='fade'
      autoplay={ true }
      fadeEffect= {{
        crossFade: true
      }}
      // onSlideChangeTransitionStart={() => console.log('onSlideChangeTransitionStart') }
      onSlideChange={() => {
        // console.log('slide changed');
        setCurrentActiveIndex(swiperRef.current.activeIndex);
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        // setMainSwiperIndex(swiper.activeIndex);
        initSwiper();
      }}
    >
      { slides }
    </Swiper>
  </div>
}

export default Hero;