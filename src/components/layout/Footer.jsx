'use client';

import { Container, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook, FaSpotify } from 'react-icons/fa';
import { FaAtlassian } from 'react-icons/fa6';

const Footer = () => {
    const socialLinks = [
        {
            name: 'Instagram',
            icon: FaInstagram,
            url: 'https://www.instagram.com/hyukoh_official/',
        },
        {
            name: 'Youtube',
            icon: FaYoutube,
            url: 'https://www.youtube.com/c/hyukoh',
        },
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://www.facebook.com/hyukoh',
        },
        {
            name: 'Spotify',
            icon: FaSpotify,
            url: 'https://open.spotify.com/artist/57okaLdCtv3nVBSn5otJkp',
        },
    ];
    return (
        <footer className='bg-gray-300 py-3'>
            <Container>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Link href={'https://www.youtube.com/c/hyukoh'}>
                        <Flex alignItems='center'>
                            <FaAtlassian size={30} className='text-black mr-2' />
                            <Text fontSize='sm' fontWeight='bold'>
                                2024 AAA
                            </Text>
                        </Flex>
                    </Link>
                    <Flex gap={3}>
                        {socialLinks.map((social) => {
                            const IconComponent = social.icon;
                            return (
                                <Link key={social.name} href={social.url} target='_blank' rel='noopener noreferrer'>
                                    <IconComponent
                                        size={30}
                                        className='text-black hover:text-gray-700 transition-colors'
                                    />
                                </Link>
                            );
                        })}
                    </Flex>
                </Flex>
            </Container>
        </footer>
    );
};

export default Footer;
