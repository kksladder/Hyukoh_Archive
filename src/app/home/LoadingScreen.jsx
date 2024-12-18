import React, { useState, useEffect } from 'react';
import '../css/output/LoadingScreen.css'; // CSS 파일을 별도로 만들었다면 import

export const LoadingScreen = ({ onLoadingComplete }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // YouTube IFrame API 비동기 로드
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // YouTube IFrame API 준비 이벤트 설정
        window.onYouTubeIframeAPIReady = () => {
            const newPlayer = new window.YT.Player('player', {
                videoId: 'Js67kofnQw0', // 재생할 유튜브 영상 ID
                playerVars: {
                    autoplay: 1, // 자동 재생
                    controls: 0, // 재생 컨트롤러 숨기기
                    disablekb: 1, // 키보드 제어 비활성화
                    fs: 0, // 전체화면 버튼 숨기기
                    rel: 0, // 관련 동영상 표시 비활성화
                    modestbranding: 1, // 로고 최소화
                    iv_load_policy: 3, // 정보 카드 숨기기
                    playsinline: 1, // 인라인 재생
                    loop: 1, // 반복 재생
                    playlist: 'Js67kofnQw0', // 반복 재생할 비디오 ID
                    origin: window.location.origin, // 보안 도메인 설정
                    showinfo: 0, // 비디오 정보 숨기기
                    autohide: 1, // 컨트롤 자동 숨기기
                },
                events: {
                    onReady: (event) => {
                        setPlayer(event.target);
                        event.target.mute(); // 음소거
                        event.target.playVideo(); // 비디오 재생
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            // 재생 중일 때 로딩 완료 이벤트 호출
                            setTimeout(onLoadingComplete, 10000);
                        }
                    },
                },
            });
            setPlayer(newPlayer);
        };

        return () => {
            delete window.onYouTubeIframeAPIReady; // cleanup
        };
    }, [onLoadingComplete]);

    return (
        <div className='loading-screen'>
            <div id='player' style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default LoadingScreen;
