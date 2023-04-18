import PropTypes from 'prop-types';
import c from 'classnames';

const Submit = ({
    id,
    name,
    value,
    text,
    color,
    fullwidth,
    isRounded,
    disabled,
    loading,
    register,
}) => (
    <button
        id={id}
        name={name}
        type="submit"
        value={value}
        className={c(
            'button',
            color,
            { 'is-rounded': isRounded },
            { 'is-loading': loading },
            { 'is-fullwidth': fullwidth }
        )}
        disabled={disabled || loading}
        ref={register}
    >
        {text}
    </button>
);

Submit.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    fullwidth: PropTypes.bool,
    isRounded: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    register: PropTypes.func,
};

Submit.defaultProps = {
    id: null,
    name: null,
    value: null,
    color: null,
    fullwidth: false,
    isRounded: false,
    disabled: false,
    loading: false,
    register: null,
};

export default Submit;
