'use client';
import React, { useState, useEffect, useRef } from 'react';
import '../css/output/LoadingScreen.css';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export const LoadingScreen = ({ onLoadingComplete }) => {
    const [isReady, setIsReady] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const playerRef = useRef(null);

    const onReady = () => {
        setIsReady(true);
        setTimeout(onLoadingComplete, 10000);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const style = document.createElement('style');
        style.textContent = `
            .ytp-chrome-top, .ytp-chrome-bottom, .ytp-gradient-top, .ytp-gradient-bottom, .ytp-show-cards-title {
                display: none !important;
            }
            .ytp-large-play-button {
                display: none !important;
            }
            .ytp-youtube-button {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [isClient]);

    useEffect(() => {
        if (!isClient || !isReady) return;

        const hideTitle = () => {
            if (playerRef.current) {
                const iframe = playerRef.current.getInternalPlayer();
                if (iframe && iframe.contentWindow) {
                    try {
                        const iframeDocument = iframe.contentWindow.document;
                        const titleElement = iframeDocument.querySelector('.ytp-title');
                        if (titleElement) {
                            titleElement.style.display = 'none';
                        }
                    } catch (error) {
                        console.error('Error accessing iframe content:', error);
                    }
                }
            }
        };

        const interval = setInterval(hideTitle, 100);
        return () => clearInterval(interval);
    }, [isClient, isReady]);

    if (!isClient) return null;

    return (
        <div className='loading-screen'>
            <ReactPlayer
                ref={playerRef}
                url='https://www.youtube.com/watch?v=Js67kofnQw0'
                width='100%'
                height='100%'
                playing={true}
                loop={true}
                muted={true}
                controls={false}
                onReady={onReady}
                config={{
                    youtube: {
                        playerVars: {
                            modestbranding: 1,
                            controls: 0,
                            showinfo: 0,
                            rel: 0,
                            iv_load_policy: 3,
                            disablekb: 1,
                            fs: 0,
                            playsinline: 1,
                        },
                        embedOptions: {
                            controls: 0,
                            showinfo: 0,
                            rel: 0,
                        },
                    },
                }}
            />
        </div>
    );
};

export default LoadingScreen;
