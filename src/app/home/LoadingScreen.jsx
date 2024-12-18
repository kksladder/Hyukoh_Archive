import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onLoadingComplete }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player('player', {
                videoId: 'Js67kofnQw0',
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    rel: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    iv_load_policy: 3,
                    playsinline: 1,
                    loop: 1,
                    playlist: 'Js67kofnQw0',
                    origin: window.location.origin,
                },
                events: {
                    onReady: (event) => {
                        setPlayer(event.target);
                        event.target.mute();
                        event.target.playVideo();
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setTimeout(onLoadingComplete, 10000);
                        }
                    },
                },
            });
        };

        return () => {
            delete window.onYouTubeIframeAPIReady;
        };
    }, [onLoadingComplete]);

    return (
        <div className='loading-screen'>
            <div id='player'></div>
        </div>
    );
};

export default LoadingScreen;
