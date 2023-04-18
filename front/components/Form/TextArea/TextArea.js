import PropTypes from 'prop-types';
import c from 'classnames';

import InputWrapper from 'components/Form/InputWrapper';

const TextArea = ({
    id,
    label,
    name,
    defaultValue,
    placeholder,
    register,
    error,
}) => (
    <InputWrapper id={id} label={label} error={error}>
        <textarea
            id={id}
            className={c('textarea', { 'is-danger': error })}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={register}
        />
    </InputWrapper>
);

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }),
};

TextArea.defaultProps = {
    defaultValue: '',
    placeholder: null,
    register: null,
    error: null,
};

export default TextArea;
