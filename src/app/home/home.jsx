'use client';

import { Container, Flex } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Main from '@/components/layout/Main';

const Home = () => {
    return (
        <div>
            <Main>
                <Container>
                    <Link>
                        <Image src={'/images/components/AAA.jpg'} alt='/' width={300} height={200} />
                    </Link>
                </Container>
            </Main>
        </div>
    );
};

export default Home;
