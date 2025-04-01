'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './AlbumPage.scss';

const MotionGallery = () => {
    const images = [
        '/images/components/20.jpg',
        '/images/components/22.jpg',
        '/images/components/23.jpg',
        '/images/components/24.jpg',
        '/images/components/pandabear.jpg',
        '/images/components/사랑으로.jpg',
    ];

    const firstColumn = images.slice(0, Math.ceil(images.length / 2));
    const secondColumn = images.slice(Math.ceil(images.length / 2));

    return (
        <div className='w-[430px] p-4 bg-gray-100 rounded-lg border border-gray-300'>
            <div className='flex justify-between gap-4'>
                {/* First Column */}
                <div className='flex flex-col gap-4 w-1/2 image-column relative'>
                    {firstColumn.map((image, index) => (
                        <div key={index} className={`image-wrapper relative floating delay-${index}`}>
                            <div className='image-container overflow-hidden'>
                                <img
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    className='w-[200px] h-[200px] object-cover duration-200 ease-in-out hover:scale-110'
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Second Column */}
                <div className='flex flex-col gap-4 w-1/2 image-column second-column relative'>
                    {secondColumn.map((image, index) => (
                        <div
                            key={index}
                            className={`image-wrapper relative floating delay-${firstColumn.length + index}`}
                        >
                            <div className='image-container overflow-hidden'>
                                <img
                                    src={image}
                                    alt={`Gallery image ${firstColumn.length + index + 1}`}
                                    className='w-[200px] h-[200px] object-cover duration-200 ease-in-out hover:scale-110 rounded-sm'
                                />
                            </div>
                        </div>
                    ))}
                </div>
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
    const [showMore, setShowMore] = useState(false);

    // 라이트 모드 적용
    useEffect(() => {
        // body에 라이트 모드 클래스 추가
        document.body.classList.add('light-mode');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';

        // 컴포넌트가 언마운트될 때 클래스 제거
        return () => {
            document.body.classList.remove('light-mode');
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    }, []);

    // 페이지가 로드될 때 로컬 스토리지에 방문 기록 저장
    useEffect(() => {
        // 랜딩 페이지에 방문 기록 저장
        localStorage.setItem('hasVisitedHyukoh', 'true');
    }, []);

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
        <div className='min-h-screen bg-white text-black flex flex-col items-center py-12'>
            <style jsx global>{`
                :root {
                    color-scheme: light;
                }
                html {
                    background-color: #ffffff;
                }
                /* 다크모드를 무시하고 항상 라이트 모드로 표시 */
                @media (prefers-color-scheme: dark) {
                    html {
                        color-scheme: light;
                        background-color: #ffffff;
                    }
                }
            `}</style>

            <Link href='https://react-sepia-five-30.vercel.app/?from=album' className='absolute top-5 left-5'>
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
                                delay: 5000,
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
                        <div className='read-me-section mt-12 bg-gray-100 text-black p-6 rounded-lg max-w-[750px]'>
                            <h1 className='text-xl font-semibold mb-4'>
                                혁오(HYUKOH)와 선셋 롤러코스터(Sunset Rollercoaster)의 프로젝트 앨범: AAA
                            </h1>
                            <h2>혁오(HYUKOH)와 선셋 롤러코스터(Sunset Rollercoaster)의 프로젝트 앨범: AAA</h2>
                            <p className={`text-gray-700 ${!showMore ? 'line-clamp-3' : ''}`}>
                                <br />
                                혁오(오혁, 임현제, 임동건, 이인우, 객원 멤버 정크야드[JNKYRD])가 타이베이에서 결성된
                                밴드 선셋 롤러코스터(Kuo-Hung Tseng, Hung-Li Chen, Shao-Hsuan Wang, Tsun-Lung Lo,
                                Hao-Ting Huang)와 프로젝트 앨범 《AAA》 를 발매했다. 이번 앨범에는 2023년 5월부터 약
                                1년간 혁오와 선셋 롤러코스터가 가평, 서울, 제주 등지에서 매달 긴밀히 함께하며 공동
                                창작한 8곡이 담겼다. 두 밴드 모두 4년만에 선보이는 앨범 《AAA》는 혁오의 충만하면서도
                                군더더기 없는 연주와 오혁 고유의 음색, 온난한 타이베이 기후를 연상시키는 선셋
                                롤러코스터의 낭만적 선율과 다양한 문화권에서 사랑받는 시적인 가사 등, 각자의 장점이
                                서로를 만나 조화로운 상승을 일으킨 결과물이다. 서로에 대한 오랜 애호, 그리고 협업의 시작
                                각각 데뷔 10년과 15년을 맞으며 아시아 전역에서 사랑받아 온 뮤지션으로서 혁오와 선셋
                                롤러코스터의 첫 인연은 더 이전으로 거슬러 올라가지만, 이들의 첫 협업은 2020년 초
                                시작되었다. 혁오가 《HYUKOH 2020 WORLD TOUR》 공연으로 도쿄를 찾았던 당시, 마침 3집 앨범
                                준비차 도쿄에 있던 선셋 롤러코스터와 대화를 나누다 오혁이 선셋 롤러코스터의
                                〈Candlelight〉에 피처링을 하게 되었고, 이후 혁오의 〈Help〉를 선셋 롤러코스터가
                                리메이크한 것. 팬데믹으로 인해 두 작업은 온라인에서만 이루어졌지만 모든 과정이 물 흐르듯
                                편안했던 이유는 두 밴드가 서로에게 가지고 있었던 오랜 애호와 존중 때문이었고, 이 과정을
                                통해 이들은 보다 긴밀하고 본격적인 협업을 상상하게 되었다. 팬데믹이 종식되고 2023년 3월
                                선셋 롤러코스터가 공연을 위해 내한했을 때 다시 만난 이들은 '함께 만드는 음악'에 대한
                                모두의 바람을 재차 확인했고, 그로부터 1년 여의 시간 동안 이번 《AAA》 앨범 작업에
                                매진했다.
                            </p>
                            {showMore && (
                                <p className='text-gray-700'>
                                    <br />
                                    <br />
                                    <strong>트랙 소개</strong>
                                    <br />
                                    <br />
                                    〈Kite War〉는 가평 음악역에서 합주 셋업을 하던 중 즉흥 연주로 만들어진 첫 곡이다.
                                    곡의 대부분이 두 개 코드로만 이루어져 있으며, 전통적이고 진실한 분위기가 물씬
                                    풍긴다. 긴 공동 창작의 시작이 된 이 곡에 대해 쿠오는 잼(jam) 연주를 시작한지 5분
                                    만에 참여한 모두가 이 곡이 완성되었음을 알았다고 후술했다. 2021년 오혁이 아이패드로
                                    만든 데모에서 시작한 〈Y〉는 반복을 최소화하고 선형적으로 흐르는 전체 구조, 가스펠을
                                    연상시키는 분위기가 인상적인 곡으로, 멤버 전원이 이번 앨범에서 가장 좋아하는 곡으로
                                    꼽는다. 만다린어로 부른 〈Antenna〉는 다양한 언어를 구사하면서도 직설적인 화법을
                                    피하는 쿠오와 오혁의 시적인 가사 작법이 두드러지는 곡이다. 중국어를 모르더라도
                                    부드러운 연음 발음의 아름다움과 몽환적인 연주를 오롯이 즐길 수 있다. 이 곡의
                                    뮤직비디오(감독 Rafhoo)에는 중화권 스타 허광한(Kuang Han Hsu)과 리아 도우(Leah
                                    Dou)가 배우로 참여했다. 타이틀 〈Glue〉는 통상적이지 않은 다양한 코드들이 정교하게
                                    얽혀 완성된 멜로디와 이에 대비되는 간결하고 낭만적인 가사가 매력적인 곡이다. 이
                                    곡에서 자연에 내재된 사랑을 떠올린 DQM 감독은 캄보디아에서 자연을 테마로
                                    뮤직비디오를 제작했다. 긴 시간 서로를 휘감으며 한 몸이 된 나무가 형상화하는 사랑과
                                    경이로운 생명력이 담긴 아름다운 장면을 곡과 함께 즐길 수 있다. 〈Young Man〉은 한때
                                    젊음을 대변했던 혁오와 선셋 롤러코스터가 이제 막 맞이한 다음 시기, 혹은 그 훨씬
                                    이후를 상상하는 곡이다. 젊음 이후의 생존과 싸움, 미래에 대한 불안이 담긴 가사와
                                    대비되는 밝고 낙천적인 멜로디가 역설적 힘을 더한다. 한 명의 노인과 《AAA》 멤버
                                    전원이 출연한 SF무드의 유쾌한 뮤직비디오 연출은 바밍타이거의 〈섹시느낌 (feat. RM of
                                    BTS)〉, RM의 〈Groin〉 등 뮤직비디오로 잘 알려진 페나키(Pennacky)가 맡았다. 쿠오의
                                    데모에서 출발한 〈Do Nothing〉는 보사노바 무드의 곡으로, 그는 이 곡을 선셋
                                    롤러코스터와 혁오가 함께할 수 있는 가장 완벽한 장르로 자평한다. 보사노바는 선셋
                                    롤러코스터의 1집 제목이기도 한 데다가, 혁오 역시 《사랑으로》 앨범에 묵직하고
                                    서정적인 보사노바를 담아냈기 때문이다. 나른하고 평화로운 휴일을 연상시키는 이 곡은
                                    역설적이게도 쿠오가 중국 투어로 매우 분주하던 중에 만들어졌다. 동료 제임스
                                    포렌(James Fouren)이 〈Antenna〉 믹싱을 체크하기 위해 곡의 속도를 반으로 늦추는 것을
                                    우연히 들은 멤버들이 그 느리고 명상적인 사운드에 매료돼 이번 앨범에 포함하게 된
                                    〈Aaaannnnteeeeennnaaaaaa〉와, 가평 음악역에서 〈Young Man〉을 작업하던 당시 합주실
                                    2층에서 녹음한 날것의 버전을 트랙화 한 〈2F 年轻人〉 또한 흥미롭다. 선물같은 두 개의
                                    트랙은 음악의 시간성과 공간성을 유쾌하게 변주한 결과물이다.
                                </p>
                            )}
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className='bg-gray-800 text-white px-4 py-2 rounded-md mt-4'
                            >
                                {showMore ? 'Show Less' : 'Read More'}
                            </button>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 mt-8 md:mt-0'>
                        <h1 className='text-3xl font-bold mb-4'>AAA Album</h1>
                        <div className='bg-gray-100 p-6 rounded-lg border border-gray-300'>
                            <h2 className='text-2xl font-semibold mb-4'>Track List</h2>
                            <ul className='mb-8 border-b border-gray-300'>
                                {typedTracks.map((track, index) => (
                                    <li
                                        key={index}
                                        className='flex justify-between items-center py-3 border-b border-gray-300 last:border-b-0'
                                    >
                                        <span className='font-medium text-gray-700'>{track.num}</span>
                                        <span className='flex-grow px-4 track-title typing-effect'>
                                            {track.title}
                                            {track.cursorVisible && <span className='cursor'>|</span>}
                                        </span>
                                        <span className='text-gray-600'>{track.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cart Section */}
                        <div className='mt-6 bg-gray-100 p-6 rounded-lg border border-gray-300'>
                            <div className='flex gap-4 items-center'>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className='px-4 py-2 border border-gray-300 rounded bg-white text-black'
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                <button className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium'>
                                    Add to cart
                                </button>
                                <button className='px-6 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors border border-gray-300 text-sm font-medium'>
                                    Keep shopping
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
