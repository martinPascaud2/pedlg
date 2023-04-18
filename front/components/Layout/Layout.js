import CookieConsent from 'react-cookie-consent';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';
import Feedback from 'components/Contact';

const Layout = ({ title, centered, children }) => (
    <>
        <CookieConsent
            buttonText="J'ai compris"
            overlay
            location="top"
            sameSite="strict"
        >
            Ce site utilise un seul cookie essentiel pour son bon
            fonctionnement.
        </CookieConsent>
        <Head>
            <title>
                Prends-en de la Graine
                {title && ` · ${title}`}
            </title>
        </Head>

        <section id="pedlg__app">
            <Navbar />

            <main className={centered ? 'has-content-vcentered' : ''}>
                {children}
            </main>

            <Footer />
            <Feedback popup />
        </section>
    </>
);

Layout.propTypes = {
    title: PropTypes.string,
    centered: PropTypes.bool,
    children: PropTypes.node,
};

Layout.defaultProps = {
    title: undefined,
    centered: false,
    children: undefined,
};

export default Layout;
