import React, { useState, useRef, useEffect } from 'react';
import classes from '../scss/Hero.module.scss';
import HeroItem from './HeroItem';
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
              mediaDetails {
                sizes {
                  sourceUrl
                  name
                }
              }
              mimeType
              mediaItemUrl
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

  // console.log(data.themeGeneralSettings.hero.carousel.item);

  const formattedResponse : Array<object> = data.themeGeneralSettings.hero.carousel.item.map((item : any) => {
    return {
      title: item.title,
      content: item.content,
      videoSrc: item.gallery.find((item: any) => item.mimeType === 'video/mp4').mediaItemUrl,
    };
  });

  // console.log(formattedResponse);

  const handleEvent = (index : number, player : any) : void => {
    console.log(`${player.player.player.props.url} is playing at ${player.getCurrentTime()}`);
    // console.log(`index: ${index}`)
    // console.log(`activeSlideIndex: ${activeSlideIndex}`);
    if (index === activeSlideIndex) {
      // console.log(`${player.player.player.props.url}`)
      // console.log(`index: ${index}`)
      // console.log(`activeSlideIndex: ${activeSlideIndex}`);
      // console.log('slideNext()');
      swiperRef.current.slideNext();
      // console.log(`set state activeSlideIndex to ${swiperRef.current.activeIndex}`);
      setActiveSlideIndex(swiperRef.current.activeIndex);
    }
    player.seekTo(0);
    // console.log(`${player.player.player.props.url} is playing at ${player.getCurrentTime()}`);
  };

  const slides = formattedResponse.map((item : any, index : number) => {

    // console.log(swiperRef);
    // console.log(swiperInstance);

    return <SwiperSlide className={ classes.Slide } key={ index }>
      <HeroItem title={ item.title } content={ item.content } index={ index + 1 }></HeroItem>
      <Video src={ item.videoSrc } passedEvent={ handleEvent } currentIndex={ activeSlideIndex } index={ index }></Video>
    </SwiperSlide>
  });

  return <div className={ classes.Hero }>
    {/* { heroItems } */}
    <Swiper
      className={ classes.Swiper }
      slidesPerView={1}
      effect='fade'
      fadeEffect= {{
        crossFade: true
      }}
      // onSlideChangeTransitionStart={() => console.log('onSlideChangeTransitionStart') }
      onSlideChange={() => console.log('slide changed') }
      onSwiper={(swiper) => {
        swiperRef.current = swiper
        setSwiperInstance(swiper);
        console.log(swiper)
        setActiveSlideIndex(swiper.activeIndex);
        console.log(swiper.slides.length)
      }}
    >
      { slides }
    </Swiper>
  </div>
}

export default Hero;