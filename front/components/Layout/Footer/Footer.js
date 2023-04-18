import Link from 'next/link';

import { useSelector } from 'react-redux';

import { Icon } from '@iconify/react';
import lock from '@iconify/icons-mdi/lock-outline';
import facebookIcon from '@iconify/icons-mdi/facebook';
import instagramIcon from '@iconify/icons-mdi/instagram';
import linkedinIcon from '@iconify/icons-mdi/linkedin';

const dataLinks = {
    internal: {
        title: 'Liens rapides',
        content: [
            {
                label: 'Compte',
                href: '/settings/account',
                as: '/parametres/compte',
                loggedIn: true,
            },
            {
                label: 'Inventaire',
                href: '/settings/stock',
                as: '/parametres/inventaire',
                loggedIn: true,
            },
            {
                label: 'Liste de souhaits',
                href: '/settings/wishlist',
                as: '/parametres/liste-de-souhaits',
                loggedIn: true,
            },
            {
                label: 'Inscription',
                href: '/register',
                as: '/inscription',
                loggedIn: false,
            },
            {
                label: 'Nous contacter',
                href: '/contact',
                as: '/contact',
                loggedIn: false,
            },
            {
                label: 'Mentions legales',
                href: '/tos',
                as: '/mentions-legales',
                loggedIn: null,
            },
        ],
    },
    external: {
        title: 'Suivez-nous',
        content: [
            {
                label: 'Facebook',
                href: 'https://www.facebook.com/groups/258478495350096/',
                icon: facebookIcon,
            },
            {
                label: 'Instagram',
                href: 'https://www.instagram.com/kevin_pedlg/',
                icon: instagramIcon,
            },
            {
                label: 'LinkedIn',
                href:
                    'https://www.linkedin.com/in/k%C3%A9vin-gricourt-9489a2113/',
                icon: linkedinIcon,
            },
        ],
    },
    externalSupport: {
        title: 'Remerciements',
        content: [
            {
                label: 'Kokopelli',
                href: 'https://www.kokopelli-semences.fr',
            },
            {
                label: 'Prospecierara',
                href: 'https://www.prospecierara.ch/',
            },
        ],
    },
};

const Footer = () => {
    const { loggedIn } = useSelector(state => state.auth);

    const quickLinks = links => (
        <div className="column">
            <h6 className="subtitle is-6 is-uppercase has-text-weight-bold">
                {links.title}
            </h6>

            <ul>
                {links.content.map(link => {
                    if (link.loggedIn === loggedIn || link.loggedIn === null) {
                        return (
                            <li key={link.label}>
                                <Link href={link.href} as={link.as}>
                                    <a>{link.label}</a>
                                </Link>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </div>
    );

    const externalLinks = links => (
        <div className="column">
            <h6 className="subtitle is-6 is-uppercase has-text-weight-bold">
                {links.title}
            </h6>

            <ul>
                {links.content.map(link => (
                    <li key={link.label}>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-wrapper"
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <footer className="footer">
            <div className="container">
                <div className="columns is-desktop">
                    <div className="column is-two-fifths-desktop">
                        <h6 className="subtitle is-6 is-uppercase has-text-weight-bold">
                            À propos
                        </h6>
                        <p className="has-text-justified">
                            Nous sommes 4 étudiants d&#39;une grande école
                            d&#39;informatique. Trois d&#39;entre nous sont
                            actifs dans le milieu de l&#39;environnement et le
                            dernier est soucieux de l&#39;avenir et de la
                            préservation de notre biodiversité végétale.
                        </p>
                        <a
                            href="mailto:team@prendsendelagraine.net"
                            className="is-italic"
                        >
                            Contactez-nous pour en savoir plus...
                        </a>
                    </div>

                    <div className="column is-hidden-touch" />

                    {quickLinks(dataLinks.internal)}
                    {externalLinks(dataLinks.external)}
                    {externalLinks(dataLinks.externalSupport)}
                </div>

                <hr />

                <div className="columns is-desktop has-text-centered-touch">
                    <div className="column">
                        <p>
                            {'Tous droit réservés © 2020 '}
                            <span>
                                <a href="/">Prends-en de la Graine</a>
                            </span>
                        </p>
                    </div>
                    <div className="column has-text-right-desktop">
                        <span className="icon-wrapper">
                            <span className="icon is-left">
                                <Icon icon={lock} />
                            </span>
                            Nous respectons votre vie privée
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
