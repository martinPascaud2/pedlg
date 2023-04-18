import PropTypes from 'prop-types';
import moment from 'moment';

import { Icon } from '@iconify/react';
import link from '@iconify/icons-mdi/link';
import account from '@iconify/icons-mdi/account';
import star from '@iconify/icons-mdi/star';

import { useModal } from 'hooks';

import depList from 'lib/depList';

import Message from 'components/Message';
import ProfileShareInput from 'components/user/ProfileShareInput';
import Setting from 'components/settings/Setting';
import {
    UpdateUsername,
    UpdateAvatar,
    UpdateEmail,
    UpdateMetaDepartment,
    UpdateMetaDescription,
    DeleteAccount,
} from 'components/settings/AccountSettings/forms';
import ResendConfirmationLink from 'components/auth/ResendConfirmationLink';

import FacebookSVG from 'assets/images/facebook.svg';
import GoogleSVG from 'assets/images/google.svg';

moment.locale('fr');

const Provider = ({ network }) => (
    <span className="icon-wrapper">
        <span className="icon has-margin-right-3">
            {network === 'facebook' && (
                <FacebookSVG style={{ width: '1.25rem', height: '1.25rem' }} />
            )}
            {network === 'google' && (
                <GoogleSVG style={{ width: '1.25rem', height: '1.25rem' }} />
            )}
        </span>
        <span>
            Connecté avec
            <span className="has-text-weight-bold is-capitalized">{` ${network}`}</span>
        </span>
    </span>
);

Provider.propTypes = {
    network: PropTypes.string.isRequired,
};

const AccountSettings = ({
    id,
    hashId,
    username,
    email,
    provider,
    register,
    createdAt,
    avatar,
    department,
    description,
}) => {
    const { openModal } = useModal();
    const depObj = depList.find(dep => dep.num_dep === department);

    return (
        <>
            <div className="box">
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={link}
                                className="has-background-dark has-radius-small"
                            />
                        </span>
                        Lien de partage
                    </span>
                </h5>

                <h6 className="subtitle is-6">
                    Ce lien unique et personalisé est un accès direct vers votre
                    inventaire. Nous vous invitons à le partager sur vos réseaux
                    sociaux !
                </h6>

                <hr />

                <ProfileShareInput id={hashId} />
            </div>

            <div className="box">
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={account}
                                className="has-background-dark has-radius-small"
                            />
                        </span>
                        Votre compte
                    </span>
                </h5>

                <h6 className="subtitle is-6">
                    Les informations liées à votre compte
                </h6>

                <hr />
                <div className="columns">
                    <div className="column is-one-fifth">
                        <UpdateAvatar avatar={avatar} />
                    </div>
                    <div className="column">
                        <Setting
                            label="Nom d'utilisateur"
                            action={() => {
                                openModal(
                                    <UpdateUsername currentValue={username} />,
                                    'is-small'
                                );
                            }}
                        >
                            {username}
                        </Setting>

                        <Setting
                            label="Adresse e-mail"
                            action={() => {
                                openModal(
                                    <UpdateEmail currentValue={email} />,
                                    'is-small'
                                );
                            }}
                        >
                            {email}
                        </Setting>

                        {!register && (
                            <Message color="is-warning" size="is-small" noIcon>
                                <p>
                                    Votre adresse e-mail n&#39;est pas
                                    confirmée.
                                </p>
                                <ResendConfirmationLink id={id} />
                            </Message>
                        )}

                        <Setting label="Réseaux sociaux">
                            {(provider === 'local' && (
                                <span className="is-italic has-text-grey-light">
                                    Vous ne vous êtes pas connecté depuis un
                                    réseau social.
                                </span>
                            )) || <Provider network={provider} />}
                        </Setting>

                        <Message color="is-info" size="is-small">
                            Membre depuis le
                            {` ${moment(Number(createdAt)).format('LL')}.`}
                        </Message>
                    </div>
                </div>
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={star}
                                className="has-background-dark has-radius-small"
                            />
                        </span>
                        Personnalisation
                    </span>
                </h5>

                <h6 className="subtitle is-6">
                    Des informations optionnelles pour aider les autres
                    utilisateurs à mieux vous connaître
                </h6>

                <hr />
                <Setting
                    label="Département"
                    action={() => {
                        openModal(
                            <UpdateMetaDepartment currentValue={department} />,
                            'is-small'
                        );
                    }}
                >
                    {depObj ? depObj.dep_name : null}
                </Setting>
                <Setting
                    label="Description"
                    action={() => {
                        openModal(
                            <UpdateMetaDescription
                                currentValue={description}
                            />,
                            'is-small'
                        );
                    }}
                >
                    {description}
                </Setting>
            </div>

            <div className="has-text-right">
                <button
                    type="button"
                    className="button is-light"
                    onClick={() => openModal(<DeleteAccount />, 'is-small')}
                >
                    <span>Supprimer votre compte</span>
                </button>
            </div>
        </>
    );
};

AccountSettings.propTypes = {
    id: PropTypes.number.isRequired,
    hashId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    register: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    department: PropTypes.string,
    description: PropTypes.string,
};

AccountSettings.defaultProps = {
    department: null,
    description: null,
};

export default AccountSettings;
