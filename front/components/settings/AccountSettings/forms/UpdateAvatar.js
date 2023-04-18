import { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';

import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { useToast, useModal } from 'hooks';

import { UPDATE_USER_AVATAR } from 'lib/gql/mutations';
import parse from 'lib/utils/parseApolloErrors';

import chevronRight from '@iconify/icons-mdi/chevron-right';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import contentSave from '@iconify/icons-mdi/content-save';

import c from 'classnames';

import { ActionTypes as types } from 'store/actions/auth';
import css from '../AccountSettings.module.scss';

const avatarsDirectory = `/assets/images/avatar/`;

const numberOfAvatars = 14;

const avatarSelectionLoop = number => {
    if (number === numberOfAvatars) return 0;
    if (number === -1) return numberOfAvatars - 1;
    return number;
};

const UpdateAvatar = ({ avatar }) => {
    const [selected, selectAvatar] = useState(avatar);
    const [loading, setLoading] = useState(false);

    const onSelectAvatar = inc => {
        const currentAvatarNumber = Number(selected?.split(/[.-]/)[2]);
        const newAvatarNumber = avatarSelectionLoop(currentAvatarNumber + inc);
        setLoading(true);
        selectAvatar(`avatar-pedlg-${newAvatarNumber}.jpg`);
    };
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { closeModal } = useModal();

    const onCompleted = data => {
        dispatch({
            type: types.UPDATE_CURRENT_USER_META,
            payload: { ...data.updateUserMetadata },
        });

        addToast('Votre compte a été mis à jour avec succès.', {
            color: 'is-success',
            duration: 7500,
        });

        closeModal();
    };

    const onError = data => {
        const { serverErrors } = parse(data);

        if (serverErrors.length) {
            addToast(
                "Un problème est survenu, veuillez retenter l'opération.",
                {
                    id: 'toast__update-meta-desc-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [update] = useMutation(UPDATE_USER_AVATAR, {
        onCompleted,
        onError,
    });

    const onSubmit = field => update({ variables: { field } });

    return (
        <div className="card-image has-text-centered">
            <div
                className={c(
                    css['has-arrows'],
                    'columns',
                    'is-vcentered',
                    'is-centered',
                    'is-mobile',
                    'has-margin-bottom-0'
                )}
            >
                <div
                    className={c(
                        css['is-arrow'],
                        'column has-padding-right-0',
                        'is-clickable',
                        'is-narrow'
                    )}
                    onClick={() => onSelectAvatar(-1)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => {}}
                >
                    <Icon width="25" icon={chevronLeft} />
                </div>
                <div
                    className={c(
                        'column',
                        'is-half-mobile',
                        'has-padding-right-0',
                        'has-padding-left-0'
                    )}
                >
                    <figure className="image is-128x128 is-inline-block">
                        <img
                            className="is-rounded"
                            src={`${avatarsDirectory}${selected}`}
                            alt="avatar utilisateur"
                            onLoad={() => {
                                setLoading(false);
                            }}
                        />
                        <div
                            className={c(css['lds-ring'], 'is-rounded')}
                            style={{
                                top: '-100%',
                                display: loading ? true : 'none',
                            }}
                        >
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </figure>
                </div>

                <div
                    className={c(
                        css['is-arrow'],
                        'column has-padding-left-0',
                        'is-clickable',
                        'is-narrow'
                    )}
                    onClick={() => onSelectAvatar(1)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => {}}
                >
                    <Icon width="25" icon={chevronRight} />
                </div>
            </div>

            {selected !== avatar && (
                <a
                    className={c('tag', 'is-primary', 'is-rounded')}
                    onClick={() => onSubmit(selected)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => {}}
                >
                    <span className="icon-wrapper">
                        <span className="icon is-left has-margin-right-1">
                            <Icon icon={contentSave} />
                        </span>
                        Enregistrer
                    </span>
                </a>
            )}
        </div>
    );
};

UpdateAvatar.propTypes = {
    avatar: PropTypes.string.isRequired,
};

export default UpdateAvatar;
