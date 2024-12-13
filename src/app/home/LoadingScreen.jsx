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
                width: '100%',
                height: '100%',
                playerVars: {
                    autoplay: 1,
                    controls: 0, // Hide controls
                    disablekb: 1, // Disable keyboard controls
                    fs: 0, // Disable fullscreen
                    rel: 0, // Hide related videos
                    modestbranding: 1, // Minimize YouTube logo
                    showinfo: 0, // Hide video info
                    iv_load_policy: 3, // Remove video annotations
                    playsinline: 1, // Play inline on mobile
                    loop: 1, // Loop the video
                    playlist: 'Js67kofnQw0', // Required for looping
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
        <div
            className='loading-screen'
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <div
                id='player'
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
        </div>
    );
};

export default LoadingScreen;
