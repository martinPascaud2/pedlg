import { useEffect } from 'react';

const getMobileDetect = userAgent => {
    const isAndroid = () => Boolean(userAgent.match(/Android/i));
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isSSR = () => Boolean(userAgent.match(/SSR/i));

    const isMobile = () =>
        Boolean(userAgent.match(/Mobi/i) || isIos() || isOpera());
    const isDesktop = () => Boolean(!isMobile() && !isSSR());
    return {
        isMobile,
        isDesktop,
        isAndroid,
        isIos,
        isSSR,
    };
};
const useMobileDetect = () => {
    useEffect(() => {}, []);
    const userAgent =
        typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    return getMobileDetect(userAgent);
};

module.exports = useMobileDetect;
