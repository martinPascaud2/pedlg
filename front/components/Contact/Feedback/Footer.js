import PropTypes from 'prop-types';
import c from 'classnames';

const Footer = ({ handleClose, loading, errors, style, popup }) => (
    <div className="buttons">
        <div style={style} className="column has-text-centered">
            <button
                className={c('button', 'is-primary', {
                    'is-loading': loading,
                })}
                type="submit"
                disabled={loading || Object.keys(errors).length !== 0}
            >
                Valider
            </button>
        </div>
        {popup && (
            <div style={style} className="column is-half has-text-centered">
                <button
                    className={c('button', 'is-outlined', {
                        'is-loading': loading,
                    })}
                    onClick={handleClose}
                    type="button"
                >
                    Fermer
                </button>
            </div>
        )}
    </div>
);

Footer.propTypes = {
    errors: PropTypes.objectOf(Object).isRequired,
    style: PropTypes.objectOf(Object).isRequired,
    handleClose: PropTypes.func.isRequired,
    popup: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
};

Footer.defaultProps = {
    loading: false,
};

export default Footer;
