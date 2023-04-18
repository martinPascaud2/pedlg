import PropTypes from 'prop-types';
import c from 'classnames';

import InputWrapper from 'components/Form/InputWrapper';

const Select = ({
    id,
    label,
    name,
    children,
    defaultValue,
    fullwidth,
    multiple,
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
        <div
            className={c(
                'select',
                { 'is-fullwidth': fullwidth },
                { 'is-multiple': multiple }
            )}
        >
            <select
                id={id}
                name={name}
                ref={register}
                defaultValue={defaultValue}
                multiple={multiple}
            >
                {children}
            </select>
        </div>
    </InputWrapper>
);

Select.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fullwidth: PropTypes.bool,
    multiple: PropTypes.bool,
    register: PropTypes.func,
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }),
    addonLeft: PropTypes.node,
    addonRight: PropTypes.node,
};

Select.defaultProps = {
    defaultValue: null,
    fullwidth: false,
    multiple: false,
    register: null,
    error: null,
    addonLeft: null,
    addonRight: null,
};

export default Select;
