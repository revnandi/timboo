import React, { useRef } from 'react';
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

  const playerRef : any = useRef(null);

  const handleEnded = () : void => {
    passedEndedEvent(index, playerRef.current);
  };

  const handleReset = () : void => {
    playerRef.current.seekTo(0);
  }

  return <ReactPlayer
    ref={ playerRef }
    className={ classes.Container }
    url={ src }
    playing={ currentIndex === index }
    width='100%'
    height='100%'
    muted={true}
    onReady={() => passedReadyEvent(currentIndex, index, playerRef.current)}
    onPause={() => {
      setTimeout(() => {
        handleReset();
      }, 500);
    }}
    onEnded={ () => {
      handleEnded();
    }}
  />
};

export default Video;