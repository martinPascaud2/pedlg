import { useState } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import eye from '@iconify/icons-mdi/eye';
import eyeOff from '@iconify/icons-mdi/eye-off';

import InputWrapper from 'components/Form/InputWrapper';

const icon = {
    text: eyeOff,
    password: eye,
};

const Input = ({
    id,
    label,
    name,
    type,
    defaultValue,
    placeholder,
    register,
    error,
    addonLeft,
    addonRight,
}) => {
    const [visualType, setVisualType] = useState(type);

    const toggleTypes = event => {
        if (
            event.type === 'click' ||
            [' ', 'Enter'].indexOf(event.key) !== -1
        ) {
            setVisualType(state => (state === 'text' ? 'password' : 'text'));
        }
    };

    return (
        <InputWrapper
            id={id}
            label={label}
            error={error}
            hasIcon={type === 'password'}
            addonLeft={addonLeft}
            addonRight={addonRight}
        >
            <input
                id={id}
                className={c('input', { 'is-danger': error })}
                name={name}
                type={visualType}
                defaultValue={defaultValue}
                placeholder={placeholder}
                ref={register}
            />

            {type === 'password' && (
                <span
                    role="button"
                    className="icon is-right is-clickable"
                    tabIndex="0"
                    onClick={toggleTypes}
                    onKeyDown={toggleTypes}
                >
                    <Icon icon={icon[visualType]} className="visibility-icon" />
                </span>
            )}
        </InputWrapper>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }),
    addonLeft: PropTypes.node,
    addonRight: PropTypes.node,
};

Input.defaultProps = {
    type: 'text',
    defaultValue: '',
    placeholder: null,
    register: null,
    error: null,
    addonLeft: null,
    addonRight: null,
};

export default Input;
