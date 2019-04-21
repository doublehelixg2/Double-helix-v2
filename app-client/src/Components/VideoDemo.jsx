import React from 'react'
import ReactDOM from 'react-dom'
import ReactJWPlayer from 'react-jw-player';

class VideoDemo extends React.Component {
    render() {
        return (
           <ReactJWPlayer
            playerId='my-unique-id'
            playerScript='http://jwpsrv.com/library/4+R8PsscEeO69iIACooLPQ.js'
            file='http://192.168.0.105:10000/live/2974fd7cb7/index.m3u8'
          />
        )
    }
}

export default VideoDemo