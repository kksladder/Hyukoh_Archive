import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import React from 'react';

const AboutLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </div>
    );
};

export default AboutLayout;
