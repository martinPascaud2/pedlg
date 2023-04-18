import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import copy from '@iconify/icons-mdi/content-copy';
import check from '@iconify/icons-mdi/check-bold';

const ProfileShareInput = ({ id }) => {
    const [icon, setIcon] = useState(copy);
    const [timer, setTimer] = useState(null);

    const copyLink = event => {
        event.preventDefault();

        if (
            (event.type === 'click' ||
                [' ', 'Enter'].indexOf(event.key) !== -1) &&
            !timer
        ) {
            const input = document.querySelector('#peldg__profile-share-link');

            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand('copy');
            setIcon(check);
            setTimer(
                setTimeout(() => {
                    setIcon(copy);
                    setTimer(null);
                }, 1500)
            );
        }
    };

    useEffect(() => {
        return () => clearTimeout(timer);
    });

    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <input
                    id="peldg__profile-share-link"
                    className="input"
                    type="text"
                    value={`${process.env.APP_URL}/partage/${id}`}
                    readOnly
                />
            </div>
            <div className="control">
                <a
                    className="button"
                    role="button"
                    tabIndex="0"
                    onClick={copyLink}
                    onKeyDown={copyLink}
                >
                    <span className="icon is-small">
                        <Icon icon={icon} />
                    </span>
                    <span>Copier</span>
                </a>
            </div>
        </div>
    );
};

ProfileShareInput.propTypes = {
    id: PropTypes.string.isRequired,
};

export default ProfileShareInput;
