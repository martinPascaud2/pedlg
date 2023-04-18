import Contact from 'components/Contact';

import { Icon } from '@iconify/react';
import cog from '@iconify/icons-mdi/cog';
import phone from '@iconify/icons-mdi/smartphone-android';
import email from '@iconify/icons-mdi/email';
import facebook from '@iconify/icons-mdi/facebook';
import instagram from '@iconify/icons-mdi/instagram';
import linkedin from '@iconify/icons-mdi/linkedin';

import Layout from 'components/Layout';

const ContactPage = () => (
    <Layout title="Contact">
        <section className="section">
            <div className="container">
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={cog}
                                className="has-background-primary has-radius"
                            />
                        </span>
                        Contact
                    </span>
                </h5>

                <hr className="is-hidden-mobile is-hidden-touch" />

                <div className="columns">
                    <div className="column is-one-quarter">
                        <div className="box" style={{ height: '100%' }}>
                            <p className="menu-label">EMAIL</p>
                            <div className="menu-list">
                                <a href="mailto:contact@prendsendelagraine.net">
                                    <span className="icon-wrapper">
                                        <span className="icon is-left">
                                            <Icon icon={email} />
                                        </span>
                                        team@prendsendelagraine.net
                                    </span>
                                </a>
                            </div>
                            <hr />
                            <p className="menu-label">TÉLÉPHONE</p>
                            <div className="menu-list">
                                <a href="tel:+33649843663">
                                    <span className="icon-wrapper">
                                        <span className="icon is-left">
                                            <Icon icon={phone} />
                                        </span>
                                        +33 (0)6 49 84 36 63
                                    </span>
                                </a>
                            </div>
                            <hr />

                            <p className="menu-label">Réseaux sociaux</p>
                            <div className="menu-list">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.facebook.com/groups/258478495350096/"
                                >
                                    <span className="icon-wrapper">
                                        <span className="icon is-left">
                                            <Icon icon={facebook} />
                                        </span>
                                        Facebook
                                    </span>
                                </a>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.instagram.com/kevin_pedlg/"
                                >
                                    <span className="icon-wrapper">
                                        <span className="icon is-left">
                                            <Icon icon={instagram} />
                                        </span>
                                        Instagram
                                    </span>
                                </a>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.linkedin.com/in/k%C3%A9vin-gricourt-9489a2113/"
                                >
                                    <span className="icon-wrapper">
                                        <span className="icon is-left">
                                            <Icon icon={linkedin} />
                                        </span>
                                        Linkedin
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <Contact />
                    </div>
                </div>
            </div>
        </section>
    </Layout>
);

export default ContactPage;
