import React, { useRef } from 'react';
import classes from '../scss/Video.module.scss';
// import ReactPlayer from 'react-player';
import ReactPlayer from 'react-player/lazy';

type Props = {
  index: number,
  src: string,
  passedEndedEvent: (index: number, player: any) => void,
  currentIndex: number,
  delayedIndex: number
}

const Video = ({ index, src, passedEndedEvent, currentIndex, delayedIndex }: Props) => {

  const playerRef: any = useRef(null);

  const handleEnded = (): void => {
    passedEndedEvent(index, playerRef.current);
  };

  const handleReset = (): void => {
    playerRef.current.seekTo(0);
  }

  return <ReactPlayer
    ref={ playerRef }
    className={ classes.Container }
    url={ src }
    playing={ currentIndex === index || delayedIndex === index}
    width='100%'
    height='100%'
    muted={true}
    onPause={() => handleReset() }
    onEnded={ () => {
      handleEnded();
    }}
  />
};

export default Video;