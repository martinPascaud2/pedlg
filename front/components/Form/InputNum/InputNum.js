import PropTypes from 'prop-types';
import c from 'classnames';

import InputWrapper from 'components/Form/InputWrapper';

const InputNum = ({
    id,
    label,
    name,
    defaultValue,
    min,
    max,
    step,
    placeholder,
    register,
    error,
    addonLeft,
    addonRight,
}) => (
    <InputWrapper
        id={id}
        label={label}
        error={error}
        addonLeft={addonLeft}
        addonRight={addonRight}
    >
        <input
            id={id}
            className={c('input', { 'is-danger': error })}
            name={name}
            type="number"
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            ref={register}
            onChange={event => {
                const input = event.target;
                let value = Number(input.value);

                if (max && value > max) {
                    value = max;
                } else if (min && value <= min) {
                    value = min;
                }

                input.value = value;
            }}
        />
    </InputWrapper>
);

InputNum.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }),
    addonLeft: PropTypes.node,
    addonRight: PropTypes.node,
};

InputNum.defaultProps = {
    defaultValue: null,
    placeholder: null,
    min: null,
    max: null,
    step: 1,
    register: null,
    error: null,
    addonLeft: null,
    addonRight: null,
};

export default InputNum;
