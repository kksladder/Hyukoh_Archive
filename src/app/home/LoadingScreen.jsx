import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../css/output/LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [player, setPlayer] = useState(null);

    const onReady = (event) => {
        setPlayer(event.target);
        event.target.mute();
        event.target.playVideo();
    };

    const onError = (error) => {
        console.error('YouTube video error:', error);
        onLoadingComplete();
    };

    useEffect(() => {
        if (player) {
            const timer = setTimeout(() => {
                player.pauseVideo();
                onLoadingComplete();
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [player, onLoadingComplete]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            showinfo: 1,
            playsinline: 1,
        },
    };

    return (
        <div className='loading-screen'>
            <YouTube videoId='Js67kofnQw0' opts={opts} onReady={onReady} onError={onError} />
        </div>
    );
};

export default LoadingScreen;
