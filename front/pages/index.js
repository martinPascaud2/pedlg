import { useSelector } from 'react-redux';

import Link from 'next/link';
import c from 'classnames';

import Layout from 'components/Layout';

import css from 'styles/pages/index.module.scss';

const query = '/search?available=false&field=name&limit=24&orderBy=ASC&page=0&';

const Index = () => {
    const { loggedIn } = useSelector(state => state.auth);

    const subtitle = () => (
        <p className={c('subtitle has-text-white', css.subtext)}>
            Voir la sélection
        </p>
    );
    if (loggedIn)
        return (
            <Layout title="Accueil" centered>
                <section className="section " id={css['pedlg__index-home']}>
                    <div className="container is-centered">
                        <div className="title has-text-centered">
                            Sélections de variétés
                        </div>
                        <div className="tile is-ancestor">
                            <div className="tile is-vertical">
                                <div className="tile">
                                    <div className="tile is-parent is-vertical ">
                                        <a
                                            className={c(
                                                'tile is-child box is-clickable',
                                                css['img-old-variety'],
                                                css['img-home']
                                            )}
                                            href={`${process.env.APP_URL}${query}old=true`}
                                        >
                                            <p className="title has-text-white">
                                                Les variétés anciennes...
                                            </p>
                                            {subtitle()}
                                        </a>
                                        <a
                                            className={c(
                                                'tile is-child box is-clickable',
                                                css['img-aromatic-variety'],
                                                css['img-home']
                                            )}
                                            href={`${process.env.APP_URL}${query}usages=2`}
                                        >
                                            <p className="title has-text-white">
                                                Les variétés aromatiques...
                                            </p>
                                            {subtitle()}
                                        </a>
                                    </div>
                                    <div className="tile is-parent">
                                        <a
                                            className={c(
                                                'tile is-child box is-clickable img-medicinal-variety',
                                                css['img-medicinal-variety'],
                                                css['img-home']
                                            )}
                                            href={`${process.env.APP_URL}${query}usages=3`}
                                        >
                                            <p className="title has-text-white">
                                                Les variétés médicinales...
                                            </p>
                                            {subtitle()}
                                            <figure className="image is-4by5 is-hidden-touch" />
                                        </a>
                                    </div>
                                </div>
                                <div className="tile is-parent img-infusion-variety">
                                    <a
                                        className={c(
                                            'tile is-child box is-clickable',
                                            css['img-infusion-variety'],
                                            css['img-home']
                                        )}
                                        href={`${process.env.APP_URL}${query}usages=4`}
                                    >
                                        <p className="title has-text-white">
                                            Les variétés à infuser...
                                        </p>
                                        {subtitle()}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    return (
        <Layout title="Accueil">
            <section
                id={css['pedlg__index-banner']}
                className="hero is-fullheight"
            >
                <div className="hero-body">
                    <div className="container content">
                        <div
                            className={c(
                                'has-padding-bottom-8',
                                css['pedlg__index-banner-text']
                            )}
                        >
                            <h2 className="title is-2">
                                <span className="has-text-weight-bold has-text-white">
                                    Prends-en de la Graine
                                </span>
                            </h2>
                            <h4 className="subtitle is-4 has-text-primary">
                                Partagez, échangez, sauvez la biodiversité !
                            </h4>
                        </div>

                        <div className="columns">
                            <div className="column is-half has-text-grey-dark has-text-weight-semibold">
                                <p>
                                    Avec
                                    <span className="has-text-weight-bold">
                                        {' Prends-en de la Graine'}
                                    </span>
                                    , vous pouvez gérer votre
                                    <span className="has-text-weight-bold">
                                        {' inventaire '}
                                    </span>
                                    de semence, ainsi que les variétés que vous
                                    recherchez.
                                </p>
                                <p>
                                    Partagez ensuite
                                    <span className="has-text-weight-bold">
                                        {' votre lien unique '}
                                    </span>
                                    sur les réseaux sociaux afin d&#39;initier
                                    des échanges partout en France !
                                </p>
                            </div>
                        </div>

                        <p className="has-padding-top-8">
                            <Link href="/register" as="/inscription">
                                <a
                                    role="button"
                                    className="button is-primary is-medium is-rounded"
                                >
                                    Inscription
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
