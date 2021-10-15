import React, {
  useState,
  useRef,
} from 'react';
import classes from '../../scss/Hero.module.scss';
import HeroItem from '../HeroItem';
import Video from '../Video';
import Loader from '../Loader';
import SwiperCore, { EffectFade, Autoplay, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from "@apollo/client";
import { GET_CAROUSEL } from './query';
import { useWebPSupportCheck } from 'react-use-webp-support-check';

import 'swiper/swiper.scss';
import 'swiper/components/lazy/lazy.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([EffectFade, Autoplay, Lazy]);

interface SliderItem {
  gallery: SliderGalleryItem[],
  slideIndex: number,
  title: string
}

interface SliderGalleryItem {
  id: string,
  lqip: string,
  mediaDetails: {
    width: number,
    height: number
  },
  mediaItemUrl: string,
  mimeType: string,
  slideId: number,
  src: string,
  customLength: null | number,
  firstItem: boolean
}

interface Category {
  title: string,
  slideIndex: number,
}

const Hero = () => {

  const supportsWebP = useWebPSupportCheck();

  const swiperRef: any = useRef(null);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const [delayedActiveIndex, setDelayedActiveIndex] = useState(0);
  const [currentSlideItem, setCurrentSlideItem] = useState<any>({});
  const [currentCategory, setCurrentCategory] = useState<any>({});

  const initSwiper = () => {
    // console.log(`activeIndex: ${swiperRef.current.activeIndex}`)
    setCurrentActiveIndex(swiperRef.current.activeIndex);
    setCurrentSlideItem(mergedSlides[0]);
    setCurrentCategory(categories[0]);
  };

  const { loading, error, data } = useQuery(GET_CAROUSEL);

  if (loading) return <Loader centered/>;
  if (error) return <p>Error loading data(</p>;

  const formattedResponse: Array<SliderItem> = data.themeGeneralSettings.hero.carousel.item.map((item : SliderItem, index: number) => {

    return {
      ...item,
      slideIndex: index,
      gallery: item.gallery.map((item: SliderGalleryItem, subIndex: number) => {
        return {
          ...item,
          slideId: index,
          firstItem: (subIndex === 0) ? true : false
        }
      }),
    };
  });

  // console.log(formattedResponse);

  const categories: Array<Category> = formattedResponse.map((item: Category) => {
    return {
      title: item.title,
      slideIndex: item.slideIndex
    }
  });

  // console.log(categories);

  const galleries: Array<any> = formattedResponse.map((item : SliderItem) => {

    return item.gallery;
  });

  const mergedSlides = [].concat.apply([], galleries)

  // console.log(mergedSlides);

  const handleEndedEvent = (index: number, player: any): void => {
    player.seekTo(0);
  };

  const slides = mergedSlides.map((item: SliderGalleryItem, index: number) => {

    return <SwiperSlide className={ classes.Slide } key={ index } data-swiper-autoplay={ item.customLength ? (item.customLength - 800 ) : '' }>
      {({ isActive }) => (
        (item.mimeType === 'image/jpeg' || item.mimeType === 'image/png' || item.mimeType === 'image/jpg') ? 
        <div className={ classes.ImageContainer }>
          {/* <HeroItem title={ categories[item.slideId].title } index={ item.slideId + 1 }/> */}
          {/* <Image width={ item.mediaDetails.width.toString() } height={ item.mediaDetails.height.toString() } animated={ isActive } src={ item.mediaItemUrl } lqip={ item.lqip } alt='' hero ownIndex={ index } currentSlideIndex={ currentActiveIndex } delayedSlideIndex={ delayedActiveIndex } /> */}
          <img
            data-src={ supportsWebP ? item.mediaItemUrl.replace('/wp-content/uploads/', '/wp-content/uploads-webpc/uploads/') + '.webp' : item.mediaItemUrl }
            className={ ['swiper-lazy', classes.Image ].join(' ') }
            width={ item.mediaDetails.width.toString() }
            height={ item.mediaDetails.height.toString() }
            alt=''
          />
          {/* <img className={ classes.Image } src={ item.lqip } alt=''/> */}
          <Loader hero/>
        </div>
        : 
        (item.mimeType === 'video/mp4') ?
        <>
          {/* <HeroItem title={ categories[item.slideId].title } index={ item.slideId + 1 }/> */}
          <Video src={ item.mediaItemUrl } passedEndedEvent={ handleEndedEvent } currentIndex={ currentActiveIndex } delayedIndex={ delayedActiveIndex } index={ index } ></Video>
        </>
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
      preloadImages={ false }
      watchSlidesProgress={ true }
      lazy={{
        loadPrevNext: true,
        loadOnTransitionStart: true
      }}
      fadeEffect= {{
        crossFade: true
      }}
      onSlideChangeTransitionEnd={() => {
        setDelayedActiveIndex(currentActiveIndex);
      } }
      onSlideChange={() => {
        setCurrentActiveIndex(swiperRef.current.activeIndex);
        setCurrentSlideItem(mergedSlides[swiperRef.current.activeIndex]);
        let nextSlide: any;
        if(swiperRef.current.activeIndex <= swiperRef.current.slides.length - 1) {
          nextSlide = mergedSlides[swiperRef.current.activeIndex];
        } else {
          nextSlide = mergedSlides[0];
        }
        setCurrentCategory(categories[nextSlide.slideId]);
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        initSwiper();
      }}
    >
      { slides }
      <HeroItem title={ currentCategory?.title } index={ currentCategory?.slideIndex + 1 } isAnimated={ currentSlideItem.firstItem }/>
    </Swiper>
  </div>
}

export default Hero;