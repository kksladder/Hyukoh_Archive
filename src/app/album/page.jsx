'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import './AlbumPage.scss';

const MotionGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/images/components/20.jpg',
        '/images/components/22.jpg',
        '/images/components/23.jpg',
        '/images/components/24.jpg',
        '/images/components/pandabear.jpg',
        '/images/components/사랑으로.jpg',
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 2000); // 타이밍을 2초로 변경

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className='w-[430px] h-[552px] flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden'>
            <div className='relative w-full h-full flex items-center justify-center'>
                {images.map((image, index) => (
                    <motion.img
                        key={index}
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className='absolute w-[300px] h-[300px] object-cover rounded-none'
                        initial={{ opacity: 0, scale: 0.5, rotate: -360 }}
                        animate={{
                            opacity: index === currentIndex ? 1 : 0,
                            scale: index === currentIndex ? 1 : 0.5,
                            rotate: index === currentIndex ? 0 : -360,
                        }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const AlbumPage = () => {
    const tracks = [
        { num: '1', title: 'Kite War', time: '5:56' },
        { num: '2', title: 'Y', time: '5:42' },
        { num: '3', title: 'Antenna', time: '3:24' },
        { num: '4', title: 'Glue', time: '4:20' },
        { num: '5', title: 'Young Man', time: '4:17' },
        { num: '6', title: 'Do Nothing', time: '3:46' },
        { num: '7', title: 'Aaaannnnteeeeennnaaaaaa', time: '6:50' },
        { num: '8', title: '2F 年轻人', time: '5:09' },
    ];

    const [typedTracks, setTypedTracks] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const typeTracks = async () => {
            for (const track of tracks) {
                let typedTitle = '';
                setTypedTracks((prevTracks) => [...prevTracks, { ...track, title: '', cursorVisible: true }]);
                for (let i = 0; i < track.title.length; i++) {
                    typedTitle += track.title[i];
                    setTypedTracks((prevTracks) => {
                        const updatedTracks = [...prevTracks];
                        const trackIndex = updatedTracks.findIndex((t) => t.num === track.num);
                        if (trackIndex !== -1) {
                            updatedTracks[trackIndex] = { ...updatedTracks[trackIndex], title: typedTitle };
                        }
                        return updatedTracks;
                    });
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }
                setTypedTracks((prevTracks) => {
                    const updatedTracks = [...prevTracks];
                    const trackIndex = updatedTracks.findIndex((t) => t.num === track.num);
                    if (trackIndex !== -1) {
                        updatedTracks[trackIndex] = { ...updatedTracks[trackIndex], cursorVisible: false };
                    }
                    return updatedTracks;
                });
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        };
        typeTracks();
    }, []);

    return (
        <div className='min-h-screen bg-black text-white flex flex-col items-center py-12'>
            <Link href='https://react-sepia-five-30.vercel.app/home' className='absolute top-5 left-5'>
                <Image src={'/images/components/GUOc8bHXYAAsROI.jpg'} alt={'back'} width={50} height={50} />
            </Link>
            <div className='w-full max-w-7xl px-4 mt-16'>
                <div className='flex flex-col md:flex-row gap-8 justify-center items-start'>
                    <div className='w-full md:w-2/3'>
                        <Swiper
                            className='absolute top-0 w-full aspect-square max-w-[750px] !ml-0'
                            spaceBetween={50}
                            slidesPerView={1}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <SwiperSlide key={num}>
                                    <Image
                                        src={`/images/components/1-${num}.png`}
                                        alt={`LP ${num}`}
                                        width={750}
                                        height={750}
                                        className='w-full h-auto'
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className='w-full md:w-1/3 mt-8 md:mt-0'>
                        <h1 className='text-3xl font-bold mb-4'>AAA Album</h1>
                        <div className='bg-gray-900 p-6 rounded-lg'>
                            <h2 className='text-2xl font-semibold mb-4'>Track List</h2>
                            <ul className='mb-8 border-b border-gray-700'>
                                {typedTracks.map((track, index) => (
                                    <li
                                        key={index}
                                        className='flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0'
                                    >
                                        <span className='font-medium text-gray-300'>{track.num}</span>
                                        <span className='flex-grow px-4 track-title typing-effect'>
                                            {track.title}
                                            {track.cursorVisible && <span className='cursor'>|</span>}
                                        </span>
                                        <span className='text-gray-400'>{track.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cart Section */}
                        <div className='mt-6 bg-gray-900 p-6 rounded-lg'>
                            <div className='flex gap-4 items-center'>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className='px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white'
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                <button className='px-6 py-2 bg-gray-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium'>
                                    Add to cart
                                </button>
                                <button className='px-6 py-2 bg-black text-white rounded hover:bg-gray-500 transition-colors border border-white text-sm font-medium'>
                                    keep shopping
                                </button>
                            </div>
                        </div>
                        {/* Motion Gallery */}
                        <div className='mt-6'>
                            <MotionGallery />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumPage;
