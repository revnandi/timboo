import React, { useRef, useState, useEffect } from 'react';
import classes from '../scss/Video.module.scss';
// import ReactPlayer from 'react-player';
import ReactPlayer from 'react-player/lazy';

type Props = {
  index: number,
  src: string,
  passedReadyEvent: (currentIndex: number, index: number, player: unknown) => void,
  passedEndedEvent: (index: number, player: any) => void,
  currentIndex: number
}

const Video = ({ index, src, passedReadyEvent, passedEndedEvent, currentIndex }: Props) => {

  const [currentTime, setCurrentTime] = useState(0);

  const playerRef : any = useRef(null);

  // useEffect(() => {
  //   setInterval( () => {
  //     const time = playerRef.current.getCurrentTime();
  //     setCurrentTime(time);
  //   }, 100)
  // }, [currentTime])

  const handleEnded = () : void => {
    // if (currentIndex === index) {
    //   console.log(`${src} has a duration of ${playerRef.current.getDuration()}`);
    //   console.log(`${src} has been played up to ${playerRef.current.getCurrentTime()}`);
    // }
    // console.log(`${src} has a duration of ${playerRef.current.getDuration()}`);
    // playerRef.current.seekTo(0);
    // playerRef.current.seekTo(0);
    passedEndedEvent(index, playerRef.current);
    // console.log(`${src} has been played up to ${playerRef.current.getCurrentTime()}`);
  };

  const handleReset = () : void => {
    playerRef.current.seekTo(0);
  }

  // console.log(currentIndex);

  return <ReactPlayer
    ref={ playerRef }
    className={ classes.Container }
    url={ src }
    // playing={ true }
    // loop={ true }
    width='100%'
    height='100%'
    muted={true}
    onReady={
      () => {
        passedReadyEvent(currentIndex, index, playerRef.current);
      }
    }
    onEnded={ () => {
      handleEnded();
      // console.log(`${src} video ended`);
    }}
  />
};

export default Video;