'use client';

import { Container, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <header className='top-0 lefe-0 right-0 bg-white backdrop-blur-md'>
            <Container size='full' className='flex justify-between items-center'>
                <Heading>
                    <Link href={'http://www.madeinaaa.com/'}>
                        <Image
                            src='/images/components/GUOc8bHXYAAsROI.jpg' // 로고 이미지 경로
                            alt='logo'
                            width={60} // 원하는 너비
                            height={50} // 원하는 높이
                        />
                    </Link>
                </Heading>
                <nav>
                    <Link href={'http://madeinaaa.com/'}>
                        <Image src='/images/components/20-aaa-vinyl-02-900x900.jpg' atl='' width={60} height={60} />
                    </Link>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
