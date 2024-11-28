'use client';

import { Container } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import Main from '@/components/layout/Main';
import Link from 'next/link';

const Home = () => {
    const links = [
        { href: 'https://youtu.be/Js67kofnQw0?si=qZ3Kw9L0YuRabPtT', src: '/images/components/AAA.jpg' },
        { href: 'https://youtu.be/mNYHaQTpr-M?si=xlaMl3pAprHefbJl', src: '/images/components/love.jpg' },
        { href: 'https://youtu.be/aKHbqm-D62Y?si=LEoZmiyZIcu4EdPh', src: '/images/components/24.jpg' },
        { href: 'https://youtu.be/pC6tPEaAiYU?si=Wt1EgTr6gw8tmveb', src: '/images/components/23.jpg' },
        { href: 'https://youtu.be/ECMc1SB60E0?si=1l99cEXJ3JHPKQU-', src: '/images/components/22.jpg' },
        { href: 'https://youtu.be/hwSF28PG_Fo?si=lNRagcAwcGBOZTdG', src: '/images/components/pandabear.jpg' },
        { href: 'https://youtu.be/IUoTjkS242c?si=_Y3pd_aJQ776sZLV', src: '/images/components/20.jpg' },
        // { href: '/', src: '/images/components/aalp.jpg' },
    ];

    return (
        <div>
            <Main>
                <Container>
                    <div className='flex justify-center flex-wrap gap-20 mt-10 mb-10 '>
                        {links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <Image src={link.src} alt='/' width={180} height={200} className='rounded-md' />
                            </Link>
                        ))}
                    </div>
                </Container>
            </Main>
        </div>
    );
};

export default Home;
