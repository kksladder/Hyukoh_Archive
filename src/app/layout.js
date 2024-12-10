import '@/styles/globals.scss';
import { Providers } from '@/components/providers';

export const metadata = {
    title: 'Hyukoh AAA',
    description: '혁오 밴드 아카이브 입니다.',
    openGraph: {
        title: '혁오 밴드',
        description: '혁오 밴드 아카이브 입니다.',
        type: 'website',
        url: 'http://www.mysite.com/article/article1.html',
        images: [
            {
                url: 'http://www.mysite.com/article/article1_featured_image.jpg',
            },
        ],
    },
    twitter: {
        card: 'summary',
        title: '페이지 제목',
        description: '페이지 설명',
        images: ['http://www.mysite.com/article/article1.html'],
        creator: '사이트 명',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang='ko'>
            <head>
                <link rel='shortcut icon' href='/images/components/favicon.ico' />
                <link
                    rel='stylesheet'
                    href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
                />
            </head>
            <body>
                <Providers>
                    <div id='skip-nav'>
                        <a href='#gnb'>메뉴 바로가기</a>
                        <a href='#container'>본문 바로가기</a>
                    </div>
                    <div id='wrap' className='min-h-svh flex flex-col'>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
