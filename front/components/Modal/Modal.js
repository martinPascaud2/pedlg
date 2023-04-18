import PropTypes from 'prop-types';
import c from 'classnames';

import css from './Modal.module.scss';

const Modal = ({ size, close, isClosing, children }) => (
    <aside
        className={c('modal', 'is-active', css['pedlg__modal-container'], {
            [css['is-closing']]: isClosing,
        })}
        aria-modal
        role="dialog"
        tabIndex="-1"
    >
        <div aria-hidden className="modal-background" onClick={close} />

        <div
            className={c(
                'modal-content',
                css['peldg__modal-content'],
                css[size] || css['is-default']
            )}
        >
            <button
                type="button"
                className={c(css['pedlg__modal-close'], 'delete')}
                aria-label="close"
                onClick={close}
            />

            {children}
        </div>
    </aside>
);

Modal.propTypes = {
    size: PropTypes.string,
    close: PropTypes.func.isRequired,
    isClosing: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
    size: null,
};

export default Modal;
