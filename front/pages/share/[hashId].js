import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import c from 'classnames';
import css from 'styles/pages/share/hashId.module.scss';

import Layout from 'components/Layout';
import Error from 'components/Error';

import { GET_USER, GET_CURRENT_USER } from 'lib/gql/queries';
import { useQuery } from '@apollo/react-hooks';

import IDCard from 'components/IDCard';
import Collection from 'components/PublicStock/Collection';
import ProfileTabs from 'components/PublicStock/ProfileTabs';

import { Icon } from '@iconify/react';
import handHeart from '@iconify/icons-mdi/hand-heart';

const Profile = () => {
    const router = useRouter();
    const { tab, hashId } = router.query;

    const [isActive, setIsActive] = useState(tab === 'Want' ? 'Want' : 'Stock');
    const [preview, setPreview] = useState();

    const {
        loading: userLoading,
        error: userError,
        data: userData,
    } = useQuery(GET_USER, { variables: { hashId } });

    const { loading: currentUserLoading, data: currentUserData } = useQuery(
        GET_CURRENT_USER
    );

    if (userLoading || currentUserLoading) return 'Chargement...';
    if (userError)
        return (
            <Error
                subtitle="Cet utilisateur n'existe pas ou a supprimé son compte."
                onClick={() => router.push('/')}
            />
        );

    return (
        <Layout title="Profile">
            <Head>
                <title>PEDLG</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    name="keywords"
                    content="troc, graines, semences, kokopelli, troc de graines, échange, biodiversité, liste"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="Venez consulter mes listes de semences que je propose en échange et celle que je souhaite"
                />
                <meta property="fb:app_id" content="201683940898487" />
                <meta property="og:title" content="Liste de partage" />

                <meta
                    property="og:url"
                    content={`${process.env.APP_URL}/partage/${hashId}`}
                />
                <meta
                    property="og:image"
                    content={`${process.env.API_URL}/static/lists/${hashId}.png`}
                />
            </Head>
            <div className="container has-margin-top-8">
                <h5 className="title is-5 has-margin-bottom-8">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={handHeart}
                                className="has-background-primary has-radius"
                            />
                        </span>
                        <p>Mes listes d&apos;échange</p>
                    </span>
                </h5>

                <div className="columns">
                    <div className="column is-one-quarter">
                        <IDCard
                            user={userData}
                            loading={userLoading}
                            isMine={
                                currentUserData?.currentUser?.hashId &&
                                currentUserData.currentUser.hashId ===
                                    userData.info.hashId
                            }
                        />
                        {preview ? (
                            <div
                                className={c(
                                    'column has-text-right',
                                    css.sticky
                                )}
                            >
                                <img
                                    src={`/assets/images/family/${preview}.jpg`}
                                    alt="no available"
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className="column is-three-quarters has-margin-bottom-8">
                        <ProfileTabs
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />
                        <Collection
                            tab="Stock"
                            isActive={isActive === 'Stock'}
                            setPreview={setPreview}
                        />
                        <Collection
                            tab="Want"
                            isActive={isActive === 'Want'}
                            setPreview={setPreview}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
