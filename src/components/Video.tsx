import React from 'react';
import classes from '../scss/Video.module.scss';
import ReactPlayer from 'react-player'

type Props = {
  src: string
}

function Video({ src }: Props) {
  return <ReactPlayer
    className={ classes.Container }
    url={ src }
    playing={ true }
    loop={ true }
    width='100%'
    height='100%'
    onEnded={ () => console.log('video ended')}
    />
}

export default Video;