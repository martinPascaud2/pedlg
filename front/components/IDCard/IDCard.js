import { useModal } from 'hooks';
import LoginModal from 'components/auth/LoginModal';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import { InlineIcon } from '@iconify/react';
import facebookIcon from '@iconify/icons-mdi/facebook';
import dotMark from '@iconify/icons-carbon/dot-mark';
import chatIcon from '@iconify/icons-mdi/chat';
import card from '@iconify/icons-mdi/card-account-details';

import departmentsList from 'lib/depList.json';

const ONLINE_COLOR = 'hsl(137, 72%, 70%)';
const OFFLINE_COLOR = 'hsl(355, 87%, 66%)';

const objectKeyByValue = (obj, val) => {
    try {
        return Object.entries(obj).find(item => item[1].num_dep === val)[1];
    } catch (e) {
        return { dep_name: null, num_dep: null };
    }
};

const IDCard = ({ user, loading, isMine }) => {
    const { loggedIn } = useSelector(state => state.auth);
    const { openModal } = useModal();
    const router = useRouter();
    const loginModal = () =>
        loggedIn === false ? openModal(<LoginModal />) : null;

    if (loading) return 'Chargement...';

    const { online, createdAt, lastLogin, username, userMetadata } = user.info;
    const { avatar, description, department } = userMetadata;

    const convertionDate = date =>
        Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);
    const colorOnlineIcon = online === true ? ONLINE_COLOR : OFFLINE_COLOR;
    const {
        dep_name: departmentName,
        num_dep: departmentCode,
    } = objectKeyByValue(departmentsList, department);

    const fbButton = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
            'facebook-share-dialog',
            'width=800,height=600'
        );
    };

    return (
        <div className="container">
            <div className="box">
                <div className="columns is-mobile">
                    <div className="column">
                        <p className="title is-size-3 is-capitalized">
                            {username}
                            <InlineIcon
                                icon={dotMark}
                                color={colorOnlineIcon}
                            />
                        </p>
                        <p className="subtitle is-size-5">
                            {departmentName ? (
                                `${departmentName}(${departmentCode})`
                            ) : (
                                <span className="has-text-grey-light is-italic is-size-6">
                                    Pas de localisation.
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="column is-narrow">
                        <figure className="image is-96x96 is-pulled-right">
                            <img
                                src={`${process.env.APP_URL}/assets/images/avatar/${avatar}`}
                                alt="avatar utilisateur"
                                className="is-rounded"
                            />
                        </figure>
                    </div>
                </div>
                <div
                    className="has-margin-top-4 has-margin-bottom-2"
                    style={{ minHeight: '5rem' }}
                >
                    {description !== null ? (
                        `"${description}"`
                    ) : (
                        <span className="has-text-grey-light">
                            Cet utilisateur n&apos;a pas&nbsp;encore de&nbsp;
                            description.
                        </span>
                    )}
                </div>
                <div className="columns has-margin-bottom-0 is-mobile">
                    <div className="column is-narrow">
                        <div className="has-text-grey-light is-size-7">
                            <span className="is-family-monospace">
                                Inscription:&nbsp;
                            </span>
                            <span className="has-text-weight-bold ">
                                {convertionDate(createdAt)}
                            </span>
                        </div>
                        <div className="has-text-grey-light is-size-7 has-margin-bottom-4">
                            <span className="is-family-monospace">
                                Connecté le:&nbsp;
                            </span>
                            <span className="has-text-weight-bold">
                                {convertionDate(lastLogin)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="buttons is-centered has-content-vcentered">
                    <button
                        type="button"
                        className="button is-rounded is-fullwidth"
                        onClick={fbButton}
                    >
                        <span className="icon">
                            <InlineIcon
                                icon={facebookIcon}
                                style={{
                                    width: '1.25rem',
                                    height: '1.25rem',
                                }}
                            />
                        </span>
                        <span>Partager ces listes</span>
                    </button>
                    {!isMine && (
                        <button
                            type="button"
                            className="button is-rounded is-fullwidth"
                            onClick={() => {
                                if (loggedIn === true && user?.info?.id)
                                    router.push(
                                        `/chat/messages?id=${user.info.id}`
                                    );
                                else loginModal();
                            }}
                        >
                            <span className="icon">
                                <InlineIcon
                                    style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                    }}
                                    icon={chatIcon}
                                />
                            </span>
                            <span>Envoyer message&nbsp;</span>
                        </button>
                    )}
                    {isMine && (
                        <button
                            type="button"
                            className="button is-rounded is-fullwidth"
                            onClick={() => router.push('/parametres/compte')}
                        >
                            <span className="icon">
                                <InlineIcon
                                    icon={card}
                                    style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                    }}
                                />
                            </span>
                            <span>Modifier mon profil</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

IDCard.propTypes = {
    user: PropTypes.objectOf(Object).isRequired,
    loading: PropTypes.bool.isRequired,
    isMine: PropTypes.bool.isRequired,
};

export default IDCard;
