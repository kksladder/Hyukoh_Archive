'use client';

import { Container, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';

const Header = () => {
    return (
        <header className='top-0 lefe-0 right-0 bg-white backdrop-blur-md'>
            <Container size='full' className='flex justify-between items-center'>
                <Heading as='h1'>logo</Heading>
                <nav>AAA</nav>
            </Container>
        </header>
    );
};

export default Header;
