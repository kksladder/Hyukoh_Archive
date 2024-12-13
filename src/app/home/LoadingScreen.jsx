import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../css/output/LoadingScreen.css'; // 새로운 CSS 파일

const LoadingScreen = ({ onLoadingComplete }) => {
    const [player, setPlayer] = useState(null);

    const onReady = (event) => {
        setPlayer(event.target);
    };

    useEffect(() => {
        if (player) {
            player.playVideo();

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
            autoplay: 1, // 자동 재생 활성화
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
        },
    };

    return (
        <div className='loading-screen'>
            <YouTube videoId='Js67kofnQw0' opts={opts} onReady={onReady} />
        </div>
    );
};

export default LoadingScreen;
