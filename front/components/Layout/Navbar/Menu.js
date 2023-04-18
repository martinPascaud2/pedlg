import Link from 'next/link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import c from 'classnames';
import { useState, useEffect } from 'react';

import { getInMemoryToken } from 'lib/utils/auth/token';
import MESSAGE_ADDED from 'lib/gql/subscriptions';
import { GET_ALL_ROOM_BY_USER } from 'lib/gql/queries';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import { InlineIcon, Icon } from '@iconify/react';
import cog from '@iconify/icons-mdi/cog';
import user from '@iconify/icons-mdi/user';
import card from '@iconify/icons-mdi/card-account-details';
import shield from '@iconify/icons-mdi/shield';
import sprout from '@iconify/icons-mdi/sprout';
import gift from '@iconify/icons-mdi/gift';
import dotMark from '@iconify/icons-carbon/dot-mark';

import SearchBar from 'components/search/SearchBar';

import { useModal } from 'hooks';

import LoginModal from 'components/auth/LoginModal';
import LogoutButton from 'components/auth/LogoutButton';

import css from './Navbar.module.scss';

const Menu = ({ isNavActive }) => {
    const { loggedIn, currentUser } = useSelector(state => state.auth);
    const { openModal } = useModal();
    const login = () => openModal(<LoginModal />);
    const { token } = getInMemoryToken();
    const [newMessage, setNewMessage] = useState(false);

    const { data: allRoomData, refetch: getRooms } = useQuery(
        GET_ALL_ROOM_BY_USER
    );

    useSubscription(MESSAGE_ADDED, {
        skip: loggedIn === false,
        onSubscriptionData: () => {
            getRooms();
        },
        variables: { token },
    });

    useEffect(() => {
        if (allRoomData?.allRoom[0]) {
            setNewMessage(
                allRoomData.allRoom[0].unread === true &&
                    allRoomData.allRoom[0].receiverId === currentUser.id
            );
        }
    });

    return (
        <div
            className={c('navbar-menu', css['pedlg__navbar-menu'], {
                'is-active': isNavActive,
            })}
        >
            <div className="navbar-start has-text-centered is-hidden-touch">
                <div className="navbar-item flex-1">
                    <SearchBar />
                </div>
            </div>
            <div className={c('navbar-end', css['pedlg__navbar-end'])}>
                <hr />

                {(loggedIn && (
                    <>
                        <Link href="/guide">
                            <a className="navbar-item has-text-weight-semibold">
                                Guide
                            </a>
                        </Link>
                        <Link href="/chat/messages">
                            <a className="navbar-item has-text-weight-semibold">
                                <span style={{ position: 'relative' }}>
                                    Messagerie
                                    {newMessage && (
                                        <InlineIcon
                                            icon={dotMark}
                                            style={{
                                                transform:
                                                    'translate(-5px, -20%)',
                                                position: 'absolute',
                                                width: '20px',
                                                height: '20px',
                                            }}
                                            color="#57bc81"
                                        />
                                    )}
                                </span>
                            </a>
                        </Link>
                        <Link
                            href="/settings/stock"
                            as="/parametres/inventaire"
                        >
                            <a className="navbar-item has-text-weight-semibold">
                                Mes listes
                            </a>
                        </Link>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                {currentUser.username}
                            </a>

                            <div className="navbar-dropdown is-boxed is-right">
                                <Link
                                    href={`/share/${currentUser.hashId}`}
                                    as={`/partage/${currentUser.hashId}`}
                                >
                                    <a className="navbar-item">
                                        <span className="icon-wrapper">
                                            <span className="icon is-left">
                                                <Icon icon={user} />
                                            </span>
                                            Mon profil
                                        </span>
                                    </a>
                                </Link>

                                <Link href="/settings/account" as="/parametres">
                                    <a className="navbar-item is-hidden-touch">
                                        <span className="icon-wrapper">
                                            <span className="icon is-left">
                                                <Icon icon={cog} />
                                            </span>
                                            Paramètres
                                        </span>
                                    </a>
                                </Link>

                                <hr className="is-hidden-touch" />

                                <div className="navbar-item is-hidden-touch">
                                    <div className="buttons is-centered">
                                        <LogoutButton />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-item has-dropdown is-hoverable is-hidden-desktop">
                            <a className="navbar-link">Paramètres</a>

                            <div className="navbar-dropdown">
                                <Link
                                    href="/settings/account"
                                    as="/parametres/compte"
                                >
                                    <a className="navbar-item">
                                        <span className="icon-wrapper">
                                            <span className="icon is-left">
                                                <Icon icon={card} />
                                            </span>
                                            Compte
                                        </span>
                                    </a>
                                </Link>

                                <Link
                                    href="/settings/security"
                                    as="/parametres/securite"
                                >
                                    <a className="navbar-item">
                                        <span className="icon-wrapper">
                                            <span className="icon is-left">
                                                <Icon icon={shield} />
                                            </span>
                                            Sécurité
                                        </span>
                                    </a>
                                </Link>

                                <Link
                                    href="/settings/stock"
                                    as="/parametres/inventaire"
                                >
                                    <a className="navbar-item">
                                        <span className="icon-wrapper">
                                            <span className="icon is-left">
                                                <Icon icon={sprout} />
                                            </span>
                                            Gérer mon inventaire
                                        </span>
                                    </a>
                                </Link>

                                <Link
                                    href="/settings/wishlist"
                                    as="/parametres/liste-de-souhaits"
                                >
                                    <a className="navbar-item">
                                        <span className="icon-wrapper">
                                            <span className="icon is-left">
                                                <Icon icon={gift} />
                                            </span>
                                            Gérer ma liste de souhait
                                        </span>
                                    </a>
                                </Link>

                                <hr />

                                <div className="navbar-item">
                                    <div className="buttons is-centered">
                                        <LogoutButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )) || (
                    <div className="navbar-item">
                        <div className="buttons is-centered">
                            <a
                                href="#"
                                className="button is-rounded"
                                role="button"
                                onClick={login}
                            >
                                Connexion
                            </a>

                            <Link href="/register" as="/inscription">
                                <a className="button is-primary is-rounded">
                                    Inscription
                                </a>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

Menu.propTypes = {
    isNavActive: PropTypes.bool.isRequired,
};

export default Menu;
