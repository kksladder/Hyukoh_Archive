'use client';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import Image from 'next/image';
import Main from '@/components/layout/Main';
import Link from 'next/link';

const Home = () => {
    const canvasRef = useRef(null);
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

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const blockSize = 80;
        const arrowSize = 40;

        const drawBackground = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let x = -blockSize; x < canvas.width + blockSize; x += blockSize) {
                for (let y = -blockSize; y < canvas.height + blockSize; y += blockSize) {
                    const distanceToMouse = Math.sqrt(
                        Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
                    );

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

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    ctx.fill();

                    ctx.restore();
                }
            }
        };

        const render = () => {
            drawBackground();
            requestAnimationFrame(render);
        };

        render();

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(render);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mousePosition]);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div
            className='relative flex items-center justify-center min-h-screen bg-cover bg-center w-180 h-200'
            style={{
                backgroundImage: "url('/images/components/bg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '374px 388px',
                backgroundPosition: 'center',
            }}
        >
            <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'></canvas>

            <Main>
                <Container>
                    <div className='flex justify-center items-center flex-wrap gap-4 mt-auto mb-auto'>
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
