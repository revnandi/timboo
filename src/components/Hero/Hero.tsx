import React, { useState, useRef, useEffect } from 'react';
import classes from '../../scss/Hero.module.scss';
import HeroItem from '../HeroItem';
import Image from '../Image';
import Video from '../Video';
import Loader from '../Loader';
import { useQuery } from "@apollo/client";
import SwiperCore, { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GET_CAROUSEL } from './query';

import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([EffectFade]);


// const withData = graphql<Response>(GET_CAROUSEL);

// class Hero extends React.Component<ChildProps<Response>, {}> {

//   render(){
//     const { loading, hero, error } = useQuery();

//     if (loading) return <Loader/>;
//     if (error) return <p>Error :(</p>;
//       return hero
//   }
// }

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
  src: string
}

const Hero = () => {

  const swiperRef: any = useRef(null);

  const [videoPlayers, setVideoPlayers] = useState<any>([]);

  const [swiperMap, setSwiperMap] = useState(new Map());

  const [videosLoadedState, setVideosLoadedState] = useState(0)
  // useEffect(() => {
  //   const updateswiperMap = (key: unknown,value: unknown) => {
  //     setSwiperMap(swiperMap.set(key, value));
  //   }
  // })
  const updateswiperMap = (key: unknown, value: unknown) => {
    setSwiperMap(swiperMap.set(key, value));
  }

  const initSwiper = () => {
    console.log(swiperRef.current);
  };

  // useEffect(() => {

  // });

  // useEffect(() => {
    // if(swiperRef.current) {
    //   console.log(swiperRef.current.slides.length)
    //   setMainSwiperLength(swiperRef.current.slides.length);
    // }

    // console.log(subSwipers);
    // if(subSwipers.length > 0) {
    //   console.log(subSwipers)
    //   console.log(`activeSubIndex: ${activeSubIndex}`)
    //   console.log(`mainSwiperIndex: ${mainSwiperIndex}`)
    //   console.log(`subSwipers[mainSwiperIndex].slides.lengt: ${subSwipers[mainSwiperIndex].slides.length}`)
    //   setActiveMainLength(subSwipers[mainSwiperIndex].slides.length)
    //   console.log(`activeMainLength: ${activeMainLength}`);

    //   console.log(`mainSwiperIndex, mainSwiperLength: ${mainSwiperIndex} ${mainSwiperLength}`)

    //   if(activeSubIndex < activeMainLength) {
    //     setTimeout(() => {
    //       console.log('%cinside setTimeout', 'font-weight: bold;color:green')
    //       subSwipers[mainSwiperIndex].slideNext();
    //       setActiveSubIndex(activeSubIndex + 1)
    //     }, 1000);
    //   } else if((activeSubIndex === activeMainLength) && (mainSwiperIndex + 1 < mainSwiperLength)){
    //     console.log('%cinside first else', 'font-weight: bold;color:green')
    //     swiperRef.current.slideNext();
    //     setMainSwiperIndex(mainSwiperIndex + 1);
    //     setActiveSubIndex(0);
    //   } else if((activeSubIndex === activeMainLength) && (mainSwiperIndex + 1 === mainSwiperLength)) {
    //     console.log('%cinside second else', 'font-weight: bold;color:green')
    //     // console.log(`%cmainSwiperIndex: ${mainSwiperIndex} activeSubIndex: ${activeSubIndex}`, 'font-weight: bold;color:red')
    //     setMainSwiperIndex(0);
    //     setActiveSubIndex(0);
    //     console.log(`%cmainSwiperIndex: ${mainSwiperIndex} activeSubIndex: ${activeSubIndex}`, 'font-weight: bold;color:red')
    //     swiperRef.current.slideTo(0);
    //   }

      // setInterval(() => {
      //   if (activeSubIndex + 1 < activeSubLength) {
      //     subSwipers[activeSubIndex].slideNext();
      //     setActiveSubIndex(activeSubIndex + 1);
      //   } else if (activeSubIndex === activeSubLength) {
      //     console.log(`activeSubIndex, activeSubLength: ${activeSubIndex} ${activeSubLength}`);
      //     swiperRef.current.slideNext();
      //   }
      // }, 4000)
    // }

  // }, [swiperRef, subSwipers, activeSubIndex, activeMainLength, mainSwiperIndex, mainSwiperLength] );

  const { loading, error, data } = useQuery(GET_CAROUSEL);

  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;

  // console.log(data.themeGeneralSettings.hero.carousel.item);

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

  // console.log(formattedResponse);

  let numberOfvideos: number = 0; 
  let videosLoaded: number = 0;

  formattedResponse.forEach((slide: SliderItem) => {
    // console.log(slide.gallery);
    slide.gallery.forEach(item => {
      // console.log(item.mimeType.includes('video'));
      if(item.mimeType.includes('video')) {
        numberOfvideos++;
        // console.log(numberOfvideos);
      }
    });
  });

  const handleEndedEvent = (index: number, player: any): void => {
    player.seekTo(0);
  };

  const handleReadyEvent = (currentIndex : number, index: number, player: unknown): void => {
    console.log(`videosLoadedState: ${videosLoadedState}`);
    setVideosLoadedState(videosLoadedState + 1);
    console.log(`videosLoadedState: ${videosLoadedState}`);

    console.log(`videos loaded: ${videosLoaded}`);
    videosLoaded = videosLoaded + 1;
    console.log(`video player in position ${index} in main slide ${currentIndex } is ready`);

    setVideoPlayers([...videoPlayers, player])

    const currentMainSlide = swiperMap.get(currentIndex);
    // console.log(currentMainSlide);

    currentMainSlide.set(index, player);
    // console.log(currentMainSlide);
    setSwiperMap(swiperMap.set(currentIndex, currentMainSlide));

    console.log(`videos loaded: ${videosLoaded}`);
    console.log(`number of videos: ${numberOfvideos}`);

    if(videosLoadedState === numberOfvideos) {
      initSwiper();
    }

    // setSwiperMap(prev => new Map([...prev, [currentIndex, .set(index + 1, player)]]));
    // console.log(swiperMap);

    // setSubSwipers(subSwipers => [...subSwipers, player]);
  };

  const slides = formattedResponse.map((item: SliderItem, index: number) => {

    // console.log(item);

    let slideIndex = item.slideIndex;

    const galleryItems = item.gallery.map((item: any, index: number) => {
      // Sub Slides
      // console.log(item)
      // updateswiperMap(item.slideId, item);
      return <SwiperSlide className={ [classes.Slide, classes.SubSlide ].join(' ') } key={ index }>
        {({ isActive }) => (
          (item.mimeType === 'image/jpeg' || item.mimeType === 'image/png' || item.mimeType === 'image/jpg') ? 
          <Image animated={ isActive } src={ item.mediaItemUrl } lqip={ item.lqip } alt={ item.altText } hero/> : 
          (item.mimeType === 'video/mp4') ? <Video src={ item.mediaItemUrl } passedEndedEvent={ handleEndedEvent } passedReadyEvent={ handleReadyEvent } currentIndex={ item.slideId } index={ index }></Video> : ''
        )}
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
          // setSwiperMap(swiperMap.set(index, new Map()));
          // console.log(swiperMap.get(0));
          // console.log(swiper);
          const currentSwiperMap = new Map();

          // console.log(swiper.slides);
          // console.log(typeof swiper.slides[0]);
          // console.log(Object.getOwnPropertyNames(swiper.slides[0]));

          swiper.slides.forEach((item, index) => {
            // if(item.children[0].innerHTML.includes('video')) {
            //   console.log(item)
            // }
            // console.log(item.children)
          });

          swiper.slides.forEach((item, index) => {
            // console.log(`index: ${index}, slideIndex: ${slideIndex}`)
            currentSwiperMap.set(index, item);
            // console.log(currentSwiperMap)
            // console.log(index)
            // const oldSwiperMap = swiperMap;
            // console.log(oldSwiperMap)
            // setSwiperMap(swiperMap.set(index, new Map().set(index, item)));
          });

          setSwiperMap(prev => new Map([...prev, [slideIndex, currentSwiperMap]]));
          // console.log(swiperMap);
          // swipersArray.push(swiper);
          // initLoop();
          // swipersArray.push(swiper)
          // console.log(swipersArray);
          // setSubSwipers(subSwipers => [...subSwipers, swiper])
          // updateArray(subSwipers => [...subSwipers, swiper]);
          // console.log(subSwipers);
        }}
        onReachEnd={(swiper) => {
          // console.log('end reached');
          // console.log(swiper);
        }}
        >
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
        // setMainSwiperIndex(swiper.activeIndex);
      }}
    >
      { slides }
    </Swiper>
  </div>
}

export default Hero;