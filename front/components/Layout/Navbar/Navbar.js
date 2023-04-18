import { useState } from 'react';
import Link from 'next/link';
import c from 'classnames';

import { Icon } from '@iconify/react';
import menu from '@iconify/icons-mdi/menu';
import close from '@iconify/icons-mdi/close';

import Menu from 'components/Layout/Navbar/Menu';
import SearchBar from 'components/search/SearchBar';

import Logo from 'assets/images/pedlg.svg';

import css from './Navbar.module.scss';

const Navbar = () => {
    const [isNavActive, setIsNavActive] = useState(false);

    const toggleMenu = event => {
        if (
            event.type === 'click' ||
            [' ', 'Enter'].indexOf(event.key) !== -1
        ) {
            setIsNavActive(!isNavActive);
        }
    };

    return (
        <nav
            className={c(
                css.pedlg__navbar,
                'navbar',
                'is-white',
                'is-fixed-top'
            )}
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container">
                <div
                    className={c('navbar-brand', { 'is-active': isNavActive })}
                >
                    <Link href="/index" as="/">
                        <a className="navbar-item">
                            <Logo
                                className={css.pedlg__logo}
                                width="42px"
                                height="42px"
                            />

                            <span className="has-text-weight-bold">
                                <span className="is-hidden-desktop">PEDLG</span>
                                <span className="is-hidden-touch">
                                    Prends-en de la Graine
                                </span>
                            </span>
                        </a>
                    </Link>

                    <div className="navbar-item flex-1 is-hidden-desktop">
                        <SearchBar />
                    </div>

                    <a
                        role="button"
                        tabIndex="0"
                        className={c(
                            css.pedlg__burger,
                            'navbar-burger',
                            'is-flex-touch'
                        )}
                        aria-label="menu"
                        aria-expanded={!isNavActive}
                        onClick={toggleMenu}
                        onKeyDown={toggleMenu}
                    >
                        <Icon
                            icon={isNavActive ? close : menu}
                            style={{
                                width: '1.75rem',
                                height: '1.75rem',
                            }}
                        />
                    </a>
                </div>

                <Menu isNavActive={isNavActive} />
            </div>
        </nav>
    );
};

export default Navbar;
