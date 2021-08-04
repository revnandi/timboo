import React, { useRef, useState } from 'react';
import classes from '../scss/ProjectsSwiper.module.scss';
import Image from '../components/Image';
import SwiperCore, { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

// interface ImageObject {
//   src: string,
//   lqip: string,
//   alt: string
// }

// interface ProjectObject {
//   title: string
//   content: string
//   image: ImageObject
// }

// type ProjectsSwiperProps = {
//   item: ProjectObject
//   index: number
// }

const ProjectsSwiper = ({ gallery }: any) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  SwiperCore.use([EffectFade]);

  const swiperRef : any = useRef(null);
  // const swiperNext = useRef<HTMLElement>(null);
  // const swiperPrev = useRef<HTMLElement>(null);

  // console.log(gallery);

  const galleryItems = gallery.map((item: any, index : number) => {
    // console.log(item)
    return <SwiperSlide className={ classes.Slide } key={ index }>
      <Image srcSet={ item.srcSet } lqip={ item.lqip } alt='TODO' width='640' height='435' fitted={ true }></Image>
      <div className={ [classes.Nav, classes.Next, isHovered === true ? classes.NavVisible : ''].join(' ') } onClick={ () => swiperRef.current.slideNext() }></div>
      <div className={ [classes.Nav, classes.Prev, isHovered === true ? classes.NavVisible : ''].join(' ') } onClick={ () => swiperRef.current.slidePrev() }></div>
    </SwiperSlide>
  });

  return <div
    className={ classes.Container }
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
    <Swiper
      className={ classes.Swiper }
      allowTouchMove={ false }
      // allowSlidePrev={ false }
      // allowSlideNext={ false }
      fadeEffect= {{
        crossFade: true
      }}
      slidesPerView={1}
      loop={ true }
      effect='fade'
      onSwiper={(swiper) => { 
        swiperRef.current = swiper
      }}
    >
      { galleryItems }
    </Swiper>
  </div>
}

export default ProjectsSwiper;