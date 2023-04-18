import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import cog from '@iconify/icons-mdi/cog';

import Layout from 'components/Layout';
import MenuSidebar from 'components/settings/SettingsPage/MenuSidebar';

const SettingsPage = ({ title, children }) => (
    <Layout title={title ? `Paramètres › ${title}` : 'Paramètres'}>
        <section className="section">
            <div className="container">
                <h5 className="title is-5 has-margin-bottom-8">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={cog}
                                className="has-background-primary has-radius"
                            />
                        </span>

                        {title ? (
                            <>
                                Paramètres
                                <span className="has-padding-left-3 has-padding-right-3">
                                    ›
                                </span>
                                {title}
                            </>
                        ) : (
                            'Paramètres'
                        )}
                    </span>
                </h5>

                <div className="columns">
                    <div className="column is-one-quarter is-hidden-touch">
                        <MenuSidebar />
                    </div>

                    <div className="column">{children}</div>
                </div>
            </div>
        </section>
    </Layout>
);

SettingsPage.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

SettingsPage.defaultProps = {
    title: null,
};

export default SettingsPage;
