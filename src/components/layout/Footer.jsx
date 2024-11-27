'use client';

import { Container, Flex } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook, FaSpotify } from 'react-icons/fa';

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
        <footer className='bg-gray-300 py-4'>
            <Container>
                <Flex justifyContent='center' alignItems='center' gap={4}>
                    {socialLinks.map((social) => {
                        const IconComponent = social.icon;

                        return (
                            <Link key={social.name} href={social.url} target='_blank' rel='noopener noreferrer'>
                                <IconComponent size={30} className='text-black hover:text-gray-700 transition-colors' />
                            </Link>
                        );
                    })}
                </Flex>
            </Container>
        </footer>
    );
};

export default Footer;
