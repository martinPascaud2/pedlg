import { Icon } from '@iconify/react';
import click from '@iconify/icons-mdi/cursor-default-click';
import at from '@iconify/icons-mdi/at';
import forgotPassword from '@iconify/icons-mdi/forgot-password';

import LoginSocial from 'components/auth/LoginSocial';
import LoginForm from 'components/auth/LoginForm';
import PasswordRecoveryModal from 'components/auth/PasswordRecoveryModal';

import useModal from 'hooks/useModal';

const LoginModal = () => {
    const { openModal } = useModal();

    return (
        <div className="box">
            <h4 className="title is-4 is-hidden-mobile">
                Connexion
                <hr />
            </h4>

            <div className="columns">
                <div className="column">
                    <h5 className="title has-text-centered is-5">
                        <span className="icon-wrapper">
                            <span className="icon is-left">
                                <Icon
                                    icon={click}
                                    className="has-background-primary has-radius"
                                />
                            </span>
                            En un clic
                        </span>
                    </h5>

                    <LoginSocial />
                </div>

                <div className="is-divider-vertical" />

                <div className="column">
                    <h5 className="title has-text-centered is-5">
                        <span className="icon-wrapper">
                            <span className="icon is-left">
                                <Icon
                                    icon={at}
                                    className="has-background-primary has-radius"
                                />
                            </span>
                            Par e-mail
                        </span>
                    </h5>

                    <LoginForm />
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <p className="has-text-centered has-text-small">
                        <a
                            href="#"
                            className="icon-wrapper"
                            onClick={() => {
                                openModal(
                                    <PasswordRecoveryModal
                                        backTo={<LoginModal />}
                                    />,
                                    'is-small'
                                );
                            }}
                        >
                            <span className="icon">
                                <Icon icon={forgotPassword} />
                            </span>
                            Mot de passe oublié ?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
