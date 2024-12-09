import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import { Container } from '@chakra-ui/layout';
import Image from 'next/image';
import IntroSwiper from './home/intro';
import Home from './home/home';
import '@/styles/globals.scss';

export default function Page() {
    return (
        <>
            <Header />
            <Main>
                <Home />
            </Main>
            <Footer />
        </>
    );
}
