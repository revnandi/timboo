import React, { useState, useRef, useEffect } from 'react';
import classes from '../scss/Hero.module.scss';
import HeroItem from './HeroItem';
import Image from './Image';
import Video from './Video';
import Loader from './Loader';
import { useQuery, gql } from "@apollo/client";
import SwiperCore, { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([EffectFade]);

const GET_CAROUSEL = gql`
  query GetCarousel {
    themeGeneralSettings {
      hero {
        fieldGroupName
        carousel {
          fieldGroupName
          item {
            fieldGroupName
            gallery {
              id
              mimeType
              mediaItemUrl
              lqip: sourceUrl(size: LQIP)
              src: sourceUrl(size: LARGE)
            }
            title
            content
          }
        }
      }
    }
  }`


const Hero = () => {

  const swiperRef : any = useRef(null);
  const subSwiperRef : any = useRef(null);
  const [subSwiperRefs, setSubSwiperRefs] = useState<Array<unknown>>([]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // useEffect(() => {
  //   if (swiperInstance) {
  //     console.log(swiperInstance);
  //   }
  // }, [swiperInstance]);

  const { loading, error, data } = useQuery(GET_CAROUSEL);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  console.log(data.themeGeneralSettings.hero.carousel.item);

  const formattedResponse : Array<object> = data.themeGeneralSettings.hero.carousel.item.map((item : any) => {

    return {
      title: item.title,
      content: item.content,
      gallery: item.gallery
    };
  });

  // console.log(formattedResponse);

  const numberOfSlides = (): number => {
    return swiperRef.current.slides.length;
  }

  const initLoop = (): void => {
    setInterval(() => {
      // console.log(`number of slides: ${numberOfSlides()}`);
      swiperRef.current.slideNext();
      // console.log(`active slide index: ${swiperRef.current.activeIndex}`);
      // console.log(swiperRef.current.activeIndex === numberOfSlides());
      if(swiperRef.current.activeIndex === numberOfSlides()) {
        // console.log(swiperRef.current.activeIndex);
        swiperRef.current.slideTo(1);
      }
    }, 4000);
  }

  const handleEvent = (index: number, player: any): void => {
    // console.log(`${player.player.player.props.url} is playing at ${player.getCurrentTime()}`);
    // console.log(`index: ${index}`)
    // console.log(`activeSlideIndex: ${activeSlideIndex}`);
    if (index === activeSlideIndex) {
      // console.log(`${player.player.player.props.url}`)
      // console.log(`index: ${index}`)
      // console.log(`activeSlideIndex: ${activeSlideIndex}`);
      // console.log('slideNext()');
      // console.log(player);
      // swiperRef.current.slideNext();
      // console.log(`set state activeSlideIndex to ${swiperRef.current.activeIndex}`);
      // setActiveSlideIndex(swiperRef.current.activeIndex);
    }
    player.seekTo(0);
    // console.log(`${player.player.player.props.url} is playing at ${player.getCurrentTime()}`);
  };

  const slides = formattedResponse.map((item: any, index: number) => {

    const galleryItems = item.gallery.map((item: any, index: number) => {

      return <SwiperSlide className={ [classes.Slide, classes.SubSlide].join(' ') } key={ index }>
        { item.mimeType === 'video/mp4' &&
          <Video src={ item.mediaItemUrl } passedEvent={ handleEvent } currentIndex={ activeSlideIndex } index={ index }></Video>
        }
        { (item.mimeType === 'image/jpeg' || item.mimeType === 'image/png' || item.mimeType === 'image/jpg') &&
          // <img src={ item.mediaItemUrl } alt="" />
          <Image src={ item.mediaItemUrl } lqip={ item.lqip } alt={ item.altText } hero/>
        }
      </SwiperSlide>
    });

    return <SwiperSlide className={ classes.Slide } key={ index }>
      <HeroItem title={ item.title } content={ item.content } index={ index + 1 }></HeroItem>
      {/* <Video src={ item.videoSrc } passedEvent={ handleEvent } currentIndex={ activeSlideIndex } index={ index }></Video> */}
      <Swiper
        className={ classes.SubSwiper }
        slidesPerView={1}
        allowTouchMove={ false }
        effect='fade'
        fadeEffect= {{
          crossFade: true
        }}
        onSwiper={(swiper) => {
          console.log(swiper);
          // setSubSwiperRefs.current[0]
        }}>
        { galleryItems }
      </Swiper>
    </SwiperSlide>
  });

  return <div className={ classes.Hero }>
    {/* { heroItems } */}
    <Swiper
      className={ classes.Swiper }
      slidesPerView={1}
      allowTouchMove={ false }
      effect='fade'
      fadeEffect= {{
        crossFade: true
      }}
      // onSlideChangeTransitionStart={() => console.log('onSlideChangeTransitionStart') }
      onSlideChange={() => console.log('slide changed') }
      onSwiper={(swiper) => {
        swiperRef.current = swiper
        setSwiperInstance(swiper);
        // console.log(swiper);
        setActiveSlideIndex(swiper.activeIndex);
        // console.log(swiper.slides.length);
        initLoop();
      }}
    >
      { slides }
    </Swiper>
  </div>
}

export default Hero;