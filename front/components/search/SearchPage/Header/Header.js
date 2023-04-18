import { Icon } from '@iconify/react';

import c from 'classnames';

import PropTypes from 'prop-types';

const Header = ({ icon, title, onClick }) => (
    <>
        <h5 className="title is-5">
            <span
                onClick={onClick}
                role="button"
                tabIndex={0}
                onKeyPress={onClick}
                className={c({ 'icon-wrapper is-clickable': onClick !== null })}
            >
                <span className="icon is-left has-margin-right-3">
                    <Icon
                        icon={icon}
                        className="has-background-primary has-radius"
                    />
                </span>
                <span>{title}</span>
            </span>
        </h5>

        <hr className="is-hidden-mobile is-hidden-touch" />
    </>
);

Header.propTypes = {
    icon: PropTypes.objectOf(Object).isRequired,
    title: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

Header.defaultProps = {
    onClick: null,
};

export default Header;
