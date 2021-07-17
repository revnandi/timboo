import React from 'react';
import classes from '../scss/Hero.module.scss';
import HeroItem from './HeroItem';
import Video from './Video';
import Loader from './Loader';
import { useQuery, gql } from "@apollo/client";
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

SwiperCore.use([Autoplay, EffectFade]);

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


function Hero() {

  const { loading, error, data } = useQuery(GET_CAROUSEL);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  console.log(data.themeGeneralSettings.hero.carousel.item);

  const formattedResponse : Array<object> = data.themeGeneralSettings.hero.carousel.item.map((item : any) => {
    return {
      title: item.title,
      content: item.content,
      videoSrc: item.gallery.find((item: any) => item.mimeType === 'video/mp4').mediaItemUrl,
    }
    // if(item.mediaType === 'file') {
    //   return {
    //     type: 'video',
    //     src: item.mediaItemUrl
    //   }
    // } else if(item.mediaType === 'image') {
    //   return {
    //     type: 'image',
    //     src: {
    //       lqip: item.mediaDetails.sizes.find((item: any) => item.name === 'lqip').sourceUrl,
    //       full: item.mediaDetails.sizes.find((item: any) => item.name === 'large').sourceUrl || item.mediaItemUrl,
    //     }
    //   }
    // } else {
    //   return null
    // }
  });

  console.log(formattedResponse);

  // const heroItems = formattedResponse.map((item : any, index : number) => {
  //   console.log(index)
  //   if(item.type === 'video') {
  //     return  <div className={ classes.VideoWrapper } key={ index }>
  //       <Video src={ item.src }></Video>
  //     </div>
  //   } else {
  //     return null
  //   }
  // });

  const slides = formattedResponse.map((item : any, index : number) => {
    return <SwiperSlide className={ classes.Slide } key={ index }>
      <HeroItem title={ item.title } content={ item.content } index={ index }></HeroItem>
      <Video src={ item.videoSrc }></Video>
    </SwiperSlide>
  });

  return <div className={ classes.Hero }>
    {/* { heroItems } */}
    <Swiper
      className={ classes.Swiper }
      loop={ true }
      autoplay={ {
        delay: 4000,
      } }
      effect="fade"
      fadeEffect= {{
        crossFade: true
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      { slides }
    </Swiper>
  </div>
}

export default Hero;