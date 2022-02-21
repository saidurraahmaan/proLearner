import YouTube from "react-youtube";
import React from "react";

const YoutubeEmbedded = ({id})=>{

    const opts = {
        height:'350',
        width:'650',
        playerVars:{
            autoplay:1,
        }
    }
    const _onReady = (event)=> {
        // access to player in all event handlers via event.target
        event.target.pause();
    }
    return(
        <YouTube
            videoId={id}
            opts={opts}
            onReady={_onReady}
        />
    );
}
export default YoutubeEmbedded;