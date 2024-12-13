'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './AlbumPage.scss';

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

                // 타이핑이 끝나면 커서를 숨깁니다
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
            <Link href='/' className='absolute top-4 left-4 text-white hover:text-gray-300'>
                ← Back to AAA
            </Link>

            <div className='flex flex-col md:flex-row items-center justify-center space-x-8 w-full max-w-4xl'>
                <Swiper
                    className='w-full max-w-[500px] h-[500px]'
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <SwiperSlide key={num}>
                            <Image
                                src={`/images/components/1-${num}.png`}
                                alt={`LP ${num}`}
                                width={500}
                                height={500}
                                className='w-full h-auto items-center mt-16'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='w-full max-w-md'>
                    <h1 className='text-3xl font-bold mb-4'>AAA Album</h1>

                    <div className='bg-gray-900 p-6 rounded-lg'>
                        <h2 className='text-2xl font-semibold mb-4'>Track List</h2>
                        <ul>
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
                </div>
            </div>
        </div>
    );
};

export default AlbumPage;
