import React from 'react';

import CreateVariety from 'components/variety/CreateVariety/CreateVariety';
import LoginModal from 'components/auth/LoginModal';

import { useSelector } from 'react-redux';
import { useModal } from 'hooks';

const EmptySearch = () => {
    const { loggedIn } = useSelector(state => state.auth);
    const { openModal } = useModal();

    return (
        <div
            className="columns is-flex is-vcentered has-background-white"
            style={{
                margin: 'auto',
                height: '35vh',
            }}
        >
            <span>
                <p className="title has-text-centered has-text-grey-light">
                    Aucun résultat
                </p>
                <span>
                    {'Modifiez vos critéres ou '}
                    <a
                        onClick={() => {
                            if (loggedIn) {
                                openModal(<CreateVariety />);
                            } else {
                                openModal(<LoginModal />);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {}}
                    >
                        créer cette variété !
                    </a>
                </span>
            </span>
        </div>
    );
};
export default EmptySearch;
