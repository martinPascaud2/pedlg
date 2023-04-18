import PropTypes from 'prop-types';

import { InlineIcon } from '@iconify/react';

const ButtonAction = ({ onClick, icon, className, text }) => {
    return (
        <button type="button" className={className} onClick={onClick}>
            <InlineIcon icon={icon} className="has-margin-right-1" />
            {text}
        </button>
    );
};

ButtonAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.objectOf(Object).isRequired,
    className: PropTypes.string,
    size: PropTypes.shape({
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
    }),
    text: PropTypes.string,
};

ButtonAction.defaultProps = {
    className: 'button is-small',
    size: { width: 64, height: 64 },
    text: '',
};

export default ButtonAction;
