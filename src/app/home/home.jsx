'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import Image from 'next/image';
import Main from '@/components/layout/Main';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [fallenArrows, setFallenArrows] = useState([]);
    const [hasVisited, setHasVisited] = useState(false);

    // 로컬 스토리지에서 방문 상태를 확인
    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지 확인
        const visited = localStorage.getItem('hasVisitedHyukoh');

        // URL 파라미터 체크 (앨범 페이지에서 돌아왔는지 확인)
        const urlParams = new URLSearchParams(window.location.search);
        const fromAlbum = urlParams.get('from') === 'album';

        // 이전에 방문한 적이 있거나, 다른 페이지에서 돌아왔다면 로딩 화면 스킵
        if (visited === 'true' || fromAlbum) {
            setHasVisited(true);
            setIsLoading(false); // 이미 방문했거나 앨범에서 돌아왔다면 로딩 화면 건너뛰기

            // 앨범에서 왔다면 URL 파라미터 제거 (히스토리 유지를 위해 replaceState 사용)
            if (fromAlbum) {
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        } else {
            setHasVisited(false);
            setIsLoading(true);
        }
    }, []);

    const LoadingScreen = ({ onLoadComplete }) => {
        useEffect(() => {
            // YouTube IFrame API 로드
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // YouTube Player 초기화
            let player;
            window.onYouTubeIframeAPIReady = () => {
                player = new window.YT.Player('player1', {
                    videoId: 'Js67kofnQw0',
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        showinfo: 0,
                        rel: 0,
                        playsinline: 1,
                        mute: 1,
                    },
                    events: {
                        onReady: (event) => {
                            event.target.mute();
                            event.target.playVideo();
                            // 10초 후에 로딩 완료 처리
                            setTimeout(() => {
                                if (onLoadComplete) {
                                    // 방문 상태를 로컬 스토리지에 저장
                                    localStorage.setItem('hasVisitedHyukoh', 'true');
                                    setHasVisited(true);
                                    onLoadComplete();
                                }
                            }, 10000);
                        },
                    },
                });
            };

            return () => {
                if (player) {
                    player.destroy();
                }
                window.onYouTubeIframeAPIReady = null;
            };
        }, [onLoadComplete]);

        return (
            <>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    .loading-screen {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        overflow: hidden;
                        pointer-events: none;
                        background-color: #000;
                        z-index: 9999;
                    }

                    .youtube__area {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }

                    .youtube__cover {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        background-color: rgba(0, 0, 0, 0.1);
                    }

                    .player {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        min-width: 100%;
                        min-height: 100%;
                        width: auto;
                        height: auto;
                    }
                    .loading-screen iframe {
                        pointer-events: none;
                    }

                    @media (min-aspect-ratio: 16/9) {
                        .player {
                            width: 100%;
                            height: 56.25vw;
                        }
                    }

                    @media (max-aspect-ratio: 16/9) {
                        .player {
                            width: 177.78vh;
                            height: 100%;
                        }
                    }
                `,
                    }}
                />

                <div className='loading-screen'>
                    <div className='youtube__area'>
                        <div id='player1' className='player'></div>
                    </div>
                    <div className='youtube__cover'></div>
                </div>
            </>
        );
    };

    const links = [
        { href: 'https://youtu.be/Js67kofnQw0?si=qZ3Kw9L0YuRabPtT', src: '/images/components/AAA.jpg' },
        { href: 'https://youtu.be/mNYHaQTpr-M?si=xlaMl3pAprHefbJl', src: '/images/components/love.jpg' },
        { href: 'https://youtu.be/aKHbqm-D62Y?si=LEoZmiyZIcu4EdPh', src: '/images/components/24.jpg' },
        { href: 'https://youtu.be/pC6tPEaAiYU?si=Wt1EgTr6gw8tmveb', src: '/images/components/23.jpg' },
        { href: 'https://youtu.be/ECMc1SB60E0?si=1l99cEXJ3JHPKQU-', src: '/images/components/22.jpg' },
        { href: 'https://youtu.be/hwSF28PG_Fo?si=lNRagcAwcGBOZTdG', src: '/images/components/pandabear.jpg' },
        { href: 'https://youtu.be/IUoTjkS242c?si=_Y3pd_aJQ776sZLV', src: '/images/components/20.jpg' },
        { href: 'https://lnk.to/aaa_album', src: '/images/components/nav-archive.svg' },
        { href: 'https://youtu.be/Js67kofnQw0?si=z7yxFKk5GZZ_t4h2', src: '/images/components/nav-video.svg' },
        { href: 'https://premier.ticketek.com.sg/shows/show.aspx?sh=HSR24', src: '/images/components/nav-stores.svg' },
        { href: 'https://www.instagram.com/hyukohofficial/', src: '/images/components/nav-contact.svg' },
    ];

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        if (isLoading) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const blockSize = 30;
        const arrowSize = 15;

        const drawBackground = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let x = -blockSize; x < canvas.width + blockSize; x += blockSize) {
                for (let y = -blockSize; y < canvas.height + blockSize; y += blockSize) {
                    const randomAngle = Math.sin(Date.now() / 1000 + x * 0.1 + y * 0.1) * Math.PI;
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(randomAngle);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(arrowSize, arrowSize / 2);
                    ctx.lineTo(0, arrowSize);
                    ctx.closePath();
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    ctx.fill();
                    ctx.restore();
                }
            }
        };

        const dropArrows = () => {
            const newArrows = Array(5)
                .fill()
                .map(() => ({
                    x: Math.random() * canvas.width,
                    y: 0,
                    angle: Math.random() * Math.PI * 2,
                }));
            setFallenArrows((prev) => [...prev, ...newArrows]);
        };

        const render = () => {
            drawBackground();
            requestAnimationFrame(render);
        };

        render();
        const dropInterval = setInterval(dropArrows, 1000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(render);
            clearInterval(dropInterval);
        };
    }, [isLoading]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsSecondPage(scrollPosition > window.innerHeight / 2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 히스토리 이동 감지 및 처리
    useEffect(() => {
        const handlePopState = () => {
            // 방문한 적이 있으면 로딩 화면 스킵
            if (hasVisited) {
                setIsLoading(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasVisited]);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    // 이미 방문한 적이 있거나, 뒤로가기로 왔다면 로딩 건너뛰기
    if (isLoading && !hasVisited) {
        return <LoadingScreen onLoadComplete={handleLoadingComplete} />;
    }

    return (
        <div className='relative flex flex-col items-center justify-start min-h-screen overflow-hidden'>
            <canvas ref={canvasRef} className='fixed top-0 left-0 w-full h-full pointer-events-none z-0'></canvas>
            <Image
                src='/images/components/sumin2.png'
                alt='/'
                width={550}
                height={200}
                className='absolute left-[-143px] top-96 animate-bounce'
            />
            <Image
                src='/images/components/cut.png'
                alt='/'
                width={400}
                height={200}
                className='absolute'
                style={{ position: 'absolute', marginTop: '-5rem', marginRight: '-26rem' }}
            />
            <Image
                src='/images/components/hyukohmain.png'
                alt='/'
                width={550}
                height={200}
                className='absolute'
                style={{ position: 'absolute', marginTop: '23rem', marginRight: '-87rem' }}
            />
            <Image
                src='/images/components/paint.png'
                alt='/'
                width={300}
                height={200}
                className='absolute animate-cleaning'
                style={{ position: 'absolute', marginTop: '60rem', marginRight: '75rem' }}
            />
            <Image
                src='/images/components/wow2.png'
                alt='/'
                width={500}
                height={300}
                className='animate-spin-slow'
                style={{ position: 'absolute', marginTop: '40rem', marginRight: '-40rem' }}
            />
            <Image
                src='/images/components/injea.png'
                alt='/'
                width={400}
                height={300}
                className='absolute animate-shake'
                style={{ position: 'absolute', marginTop: '75rem', marginRight: '24rem' }}
            />
            <Image
                src='/images/components/band2.png'
                alt='/'
                width={400}
                height={300}
                style={{ position: 'absolute', marginTop: '82rem', marginRight: '-18rem' }}
            />
            <Image
                src='/images/components/ma.png'
                alt='/'
                width={400}
                height={300}
                className='absolute'
                style={{ marginTop: '97rem', marginRight: '88rem' }}
            />
            <Image
                src='/images/components/sumin.png'
                alt='/'
                width={400}
                height={300}
                className='absolute animate-wiggle-slow'
                style={{ marginTop: '109rem', marginRight: '75rem' }}
            />
            <Image
                src='/images/components/scared.png'
                alt='/'
                width={700}
                height={300}
                className='absolute animate-shake'
                style={{ marginTop: '120rem', marginRight: '51rem' }}
            />
            <Image
                src='/images/components/bat.png'
                alt='/'
                width={500}
                height={300}
                className='absolute'
                style={{ marginTop: '107rem', marginRight: '-72rem' }}
            />
            <Image
                src='/images/components/wow.png'
                alt='/'
                width={500}
                height={300}
                className='absolute animate-excited'
                style={{ marginTop: '118rem', marginRight: '-60rem' }}
            />
            <Image
                src='/images/components/up.png'
                alt='/'
                width={500}
                height={300}
                className='absolute animate-powerup'
                style={{ marginTop: '80rem', marginRight: '-65rem' }}
            />
            <Main>
                <Container>
                    <div className='flex justify-center items-center flex-wrap gap-20 mt-20 mb-8'>
                        {links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <div
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className='relative z-10'
                                >
                                    <Image
                                        src={link.src}
                                        alt='/'
                                        width={180}
                                        height={200}
                                        className={`rounded-none transition-transform duration-200 ease-in-out mt-4 ${
                                            hoveredIndex === index ? 'hover:scale-110' : 'animate-spin-slow'
                                        } lp-style`}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </Main>
            <div
                className={`w-full h-screen flex justify-around items-center transition-colors duration-500 ${
                    isSecondPage ? 'bg-black' : 'bg-transparent'
                }`}
            >
                <Image
                    src='/images/components/joje.png'
                    alt='/'
                    width={400}
                    height={200}
                    className='absolute'
                    style={{ position: 'absolute', marginBottom: '71rem', marginRight: '50rem' }}
                />
                <Link href='/album'>
                    <Image src='/images/components/AAA.jpg' alt='AAA' width={500} height={500} />
                </Link>
                <ul className='font-bold text-white w-80'>
                    {[
                        { num: '1', title: 'Kite War', time: '5:56' },
                        { num: '2', title: 'Y', time: '5:42' },
                        { num: '3', title: 'Antenna', time: '3:24' },
                        { num: '4', title: 'Glue', time: '4:20' },
                        { num: '5', title: 'Young Man', time: '4:17' },
                        { num: '6', title: 'Do Nothing', time: '3:46' },
                        { num: '7', title: 'Aaaannnnteeeeennnaaaaaa', time: '6:50' },
                        { num: '8', title: '2F 年轻人', time: '5:09' },
                    ].map((track, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center py-2 transition-all duration-700 ease-out transform ${
                                isSecondPage
                                    ? 'translate-x-0 opacity-100 border-b-2 border-white'
                                    : `${index % 2 === 0 ? '-translate-x-32' : 'translate-x-32'} opacity-0`
                            }`}
                        >
                            <span className='w-1'>{track.num}</span>
                            <span>{track.title}</span>
                            <span>{track.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-full h-screen flex items-center justify-center'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className='w-full max-w-2xl'
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <SwiperSlide key={num}>
                            <Image
                                src={`/images/components/pinpong${num}.jpg`}
                                alt={`Ping Pong ${num}`}
                                width={500}
                                height={500}
                                className='w-full h-auto items-center mt-16'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Home;
