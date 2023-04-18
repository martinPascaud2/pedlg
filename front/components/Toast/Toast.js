import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import { useToast } from 'hooks';

import css from './Toast.module.scss';

const modDurations = {
    'is-created': 175,
    'is-shakey': 500,
};

const Toast = ({ id, options, modifier, children }) => {
    const [isClosing, setIsClosing] = useState(false);
    const { removeToast, updateToast } = useToast();

    const closeSelf = useCallback(() => {
        if (!isClosing) {
            setIsClosing(true);
            setTimeout(() => removeToast(id), 175);
        }
    }, [isClosing, removeToast, id]);

    useEffect(() => {
        let timer = null;

        if (modifier) {
            timer = setTimeout(
                () => updateToast(id, null),
                modDurations[modifier]
            );
        }

        return () => clearTimeout(timer);
    }, [id, modifier, updateToast]);

    useEffect(() => {
        let timer = null;

        if (options.duration > 0) {
            timer = setTimeout(closeSelf, options.duration);
        }

        return () => clearTimeout(timer);
    }, [options, closeSelf]);

    return (
        <div
            className={c(
                css.pedlg__toast,
                'notification',
                options.color,
                { [css['is-closing']]: isClosing },
                { [css[modifier]]: !isClosing && modifier }
            )}
            aria-hidden
            role="alert"
            tabIndex={-1}
        >
            <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={closeSelf}
            />

            {children}
        </div>
    );
};

Toast.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
        color: PropTypes.string,
        duration: PropTypes.number,
    }).isRequired,
    modifier: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Toast.defaultProps = {
    modifier: null,
};

export default Toast;
