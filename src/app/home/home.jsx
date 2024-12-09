'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import Image from 'next/image';
import Main from '@/components/layout/Main';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    const canvasRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [fallenArrows, setFallenArrows] = useState([]);

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

    useEffect(() => {
        const canvas = canvasRef.current;
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
            if (!isSecondPage) drawBackground();
            requestAnimationFrame(render);
        };

        render();
        const dropInterval = setInterval(dropArrows, 1000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(render);
            clearInterval(dropInterval);
        };
    }, [isSecondPage]);

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

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='relative flex flex-col items-center justify-start min-h-screen overflow-hidden'>
            <canvas
                ref={canvasRef}
                className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
                    isSecondPage ? 'opacity-0' : 'opacity-100'
                }`}
            ></canvas>

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
                <Image src='/images/components/AAA.jpg' alt='AAA' width={500} height={500} />
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
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
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
