import Layout from 'components/Layout';
import LoginSocial from 'components/auth/LoginSocial';
import RegisterForm from 'components/auth/RegisterForm';

import { Icon } from '@iconify/react';
import click from '@iconify/icons-mdi/cursor-default-click';
import at from '@iconify/icons-mdi/at';

import { isGuest } from 'lib/utils/auth';

const Register = () => (
    <Layout title="Inscription" centered>
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column">
                        <h3 className="title has-text-centered is-3">
                            Créer un compte
                        </h3>
                    </div>
                </div>

                <hr />

                <div className="columns is-centered">
                    <div className="column is-8-widescreen is-10-tablet">
                        <div className="columns">
                            <div className="column is-two-fifths">
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

                                <RegisterForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
);

export default isGuest(Register);
