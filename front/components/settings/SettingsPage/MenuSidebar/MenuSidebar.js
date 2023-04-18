import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import c from 'classnames';

import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from 'lib/gql/queries';

import { Icon } from '@iconify/react';
import card from '@iconify/icons-mdi/card-account-details';
import shield from '@iconify/icons-mdi/shield';
import sprout from '@iconify/icons-mdi/sprout';
import gift from '@iconify/icons-mdi/gift';
import messageProcessingOutline from '@iconify/icons-mdi/message-processing-outline';
import facebookIcon from '@iconify/icons-brandico/facebook';

import MenuList from 'components/settings/SettingsPage/MenuSidebar/MenuList';

const MenuSidebar = () => {
    const { data: currentUser, loading: currentUserLoading } = useQuery(
        GET_CURRENT_USER
    );
    if (currentUserLoading) return null;
    const MenuLink = ({ href, as, children }) => {
        const router = useRouter();

        return (
            <li>
                <Link href={href} as={as}>
                    <a
                        className={c({
                            'is-active': router.pathname === href,
                        })}
                        role="button"
                        tabIndex="0"
                    >
                        {children}
                    </a>
                </Link>
            </li>
        );
    };

    MenuLink.propTypes = {
        href: PropTypes.string.isRequired,
        as: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    };

    return (
        <aside className="menu">
            <MenuList label="Public">
                <MenuLink href="/settings/account" as="/parametres/compte">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={card} />
                        </span>
                        Mon profil
                    </span>
                </MenuLink>
                <MenuLink href="/settings/stock" as="/parametres/inventaire">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={sprout} />
                        </span>
                        Mes graines
                    </span>
                </MenuLink>

                <MenuLink
                    href="/settings/wishlist"
                    as="/parametres/liste-de-souhaits"
                >
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={gift} />
                        </span>
                        Mes recherches
                    </span>
                </MenuLink>
            </MenuList>

            <MenuList label="Mes échanges">
                <MenuLink
                    href={`/share/${currentUser.currentUser.hashId}`}
                    as={`/partage/${currentUser.currentUser.hashId}`}
                >
                    <span className="icon-wrapper has-text-link">
                        <span className="icon is-left">
                            <Icon icon={facebookIcon} />
                        </span>
                        Partager sur facebook
                    </span>
                </MenuLink>
                <MenuLink href="/chat/messages" as="/chat/messages">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={messageProcessingOutline} />
                        </span>
                        Messagerie
                    </span>
                </MenuLink>
            </MenuList>

            <MenuList label="Réglages">
                <MenuLink href="/settings/security" as="/parametres/securite">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={shield} />
                        </span>
                        Sécurité
                    </span>
                </MenuLink>
            </MenuList>
        </aside>
    );
};

export default MenuSidebar;
