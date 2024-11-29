'use client';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import Image from 'next/image';
import Main from '@/components/layout/Main';
import Link from 'next/link';

const Home = () => {
    const canvasRef = useRef(null);
    const [hoverPos, setHoverPos] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredIndex, setHoveredIndex] = useState(null);

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

        // Canvas 크기 설정
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const blockSize = 30; // 화살표 패턴의 크기를 좀 더 크게
        const arrowSize = 40; // 개별 화살표 크기도 좀 더 크게

        // 배경 패턴 그리기 함수
        const drawBackground = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 화면 전체를 커버할 수 있도록 범위 확장
            for (let x = -blockSize; x < canvas.width + blockSize; x += blockSize) {
                for (let y = -blockSize; y < canvas.height + blockSize; y += blockSize) {
                    // 화살표의 위치에 따라 기울기 계산
                    const distanceToMouse = Math.sqrt(
                        Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
                    );

                    // 마우스와의 거리에 따라 화살표 기울기 조절
                    const tiltFactor = Math.max(0, 1 - distanceToMouse / 500);
                    const tiltAngle = (tiltFactor * Math.PI) / 4;

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(tiltAngle);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(arrowSize, arrowSize / 2);
                    ctx.lineTo(0, arrowSize);
                    ctx.closePath();

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; // 약간 투명도 조정
                    ctx.fill();

                    ctx.restore();
                }
            }
        };

        // 반복적인 렌더링
        const render = () => {
            drawBackground();
            requestAnimationFrame(render);
        };

        render();

        // 마우스 움직임 이벤트 리스너 추가
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(render);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mousePosition]);

    const handleMouseEnter = (index, event) => {
        const rect = event.target.getBoundingClientRect();
        setHoverPos({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        });
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverPos(null);
        setHoveredIndex(null);
    };

    return (
        <div
            className='relative flex items-center justify-center bg-center w-full h-screen'
            style={{
                backgroundImage: "url('/images/components/bg.png')",
                backgroundRepeat: 'no-repeat',
            }}
        >
            <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'></canvas>

            <Main>
                <Container>
                    <div className='flex justify-center items-center flex-wrap mt-auto mb-auto'>
                        {links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <div
                                    onMouseEnter={(event) => handleMouseEnter(index, event)}
                                    onMouseLeave={handleMouseLeave}
                                    className='relative z-10'
                                >
                                    <Image
                                        src={link.src}
                                        alt='/'
                                        width={180}
                                        height={200}
                                        className={`rounded-none transition-transform duration-200 ease-in-out mt-4 
                                            ${hoveredIndex === index ? 'hover:scale-110' : 'animate-spin-slow'}`}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </Main>
        </div>
    );
};

export default Home;
