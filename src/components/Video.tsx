import React, { useRef } from 'react';
import classes from '../scss/Video.module.scss';
import ReactPlayer from 'react-player'

type Props = {
  index: number,
  src: string,
  passedEvent: (index : number, player : any) => void,
  currentIndex: number
}

const Video = ({ index, src, passedEvent, currentIndex }: Props) => {

  const playerRef : any = useRef(null);

  const handleEnded = () => {
    // if (currentIndex === index) {
    //   console.log(`${src} has a duration of ${playerRef.current.getDuration()}`);
    //   console.log(`${src} has been played up to ${playerRef.current.getCurrentTime()}`);
    // }
    // console.log(`${src} has a duration of ${playerRef.current.getDuration()}`);
    // playerRef.current.seekTo(0);
    // playerRef.current.seekTo(0);
    passedEvent(index, playerRef.current);
    // console.log(`${src} has been played up to ${playerRef.current.getCurrentTime()}`);
  };

  // console.log(currentIndex);

  return <ReactPlayer
    ref={ playerRef }
    className={ classes.Container }
    url={ src }
    playing={ true }
    // loop={ true }
    width='100%'
    height='100%'
    muted={true}
    onEnded={ () => {
      handleEnded();
      // console.log(`${src} video ended`);
    }}
  />
};

export default Video;