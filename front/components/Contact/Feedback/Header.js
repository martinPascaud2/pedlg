import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import accountQuestion from '@iconify/icons-mdi/account-question';

const Header = ({ headerText, headerBtnText, handleClose, popup, style }) => (
    <div className="message-header has-background-white" style={style}>
        <span className="icon-wrapper">
            <span className="icon is-left">
                <Icon
                    className="has-background-dark has-radius-small"
                    icon={accountQuestion}
                />
            </span>
            <h5 className="title is-5">{headerText}</h5>
        </span>

        {popup && (
            <button type="button" onClick={handleClose} className="delete">
                {headerBtnText}
            </button>
        )}
    </div>
);

Header.propTypes = {
    style: PropTypes.objectOf(Object).isRequired,
    handleClose: PropTypes.func.isRequired,
    popup: PropTypes.bool.isRequired,
    headerBtnText: PropTypes.string,
    headerText: PropTypes.string,
};

Header.defaultProps = {
    headerText: 'Feedback',
    headerBtnText: 'X',
};

export default Header;
