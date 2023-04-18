import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import alert from '@iconify/icons-mdi/alert-circle';

import css from './ErrorInput.module.scss';

const ErrorInput = ({ error }) => (
    <div className={c(css['input-error-wrapper'], 'has-text-small')}>
        <span className="icon-wrapper">
            <span className="icon is-small is-left">
                <Icon icon={alert} />
            </span>
            {error.message}
        </span>
    </div>
);

ErrorInput.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }).isRequired,
};

export default ErrorInput;
