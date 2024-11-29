import { Container } from '@chakra-ui/layout';

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

        {
            href: 'https://www.xiaohongshu.com/user/profile/667291530000000007005a0d?xhsshare=CopyLink&appuid=667291530000000007005a0d&apptime=1719478222',
            src: '/images/components/nav-looks.svg',
        },

        { href: 'https://lnk.to/aaa_album', src: '/images/components/nav-archive.svg' },
        { href: 'https://youtu.be/Js67kofnQw0?si=z7yxFKk5GZZ_t4h2', src: '/images/components/nav-video.svg' },
        { href: 'https://premier.ticketek.com.sg/shows/show.aspx?sh=HSR24', src: '/images/components/nav-stores.svg' },
        { href: 'https://www.instagram.com/hyukohofficial/', src: '/images/components/nav-contact.svg' },
    ];

    return (
        <div
            className='relative flex items-center justify-center bg-center w-100 h-100'
            style={{
                backgroundImage: "url('/images/components/bg.png')",
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Main>
                <Container>
                    <div className='flex  justify-center items-center flex-wrap gap-20 mt-10 mb-10'>
                        {links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <Image
                                    src={link.src}
                                    alt='/'
                                    width={180}
                                    height={200}
                                    className=' rounded-md transition-transform duration-200 ease-in-out hover:scale-110 mt-4'
                                />
                            </Link>
                        ))}
                    </div>
                </Container>
            </Main>
        </div>
    );
};

export default Home;
