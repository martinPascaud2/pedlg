import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import helpCircleOutline from '@iconify/icons-mdi/help-circle-outline';

import PropTypes from 'prop-types';
import c from 'classnames';

const REDIRECTION = '/contact';

const HelpButton = ({ onClick, hidden, text, style }) => (
    <button
        className={c('button is-primary is-hovered', hidden)}
        onClick={onClick}
        type="button"
        style={style}
    >
        <span className="icon">
            <Icon icon={helpCircleOutline} />
        </span>
        <span>{text}</span>
    </button>
);

HelpButton.propTypes = {
    style: PropTypes.objectOf(Object).isRequired,
    hidden: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

const Button = ({ handleButtonClick, buttonPosition, text }) => {
    const [pathname, setPathname] = useState(null);

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    return (
        pathname !== REDIRECTION && (
            <>
                <HelpButton
                    style={buttonPosition}
                    onClick={handleButtonClick}
                    hidden="is-hidden-mobile"
                    text={text}
                />
                <HelpButton
                    style={buttonPosition}
                    onClick={() => {
                        window.location.href = REDIRECTION;
                    }}
                    hidden="is-hidden-desktop"
                    text={text}
                />
            </>
        )
    );
};

Button.propTypes = {
    buttonPosition: PropTypes.objectOf(Object).isRequired,
    handleButtonClick: PropTypes.func,
    text: PropTypes.string,
};

Button.defaultProps = {
    handleButtonClick: () => this.handleButtonClick,
    text: 'Aide',
};

export default Button;
