import PropTypes from 'prop-types';
import c from 'classnames';

import ErrorInput from 'components/Form/ErrorInput';

const InputWrapper = ({
    id,
    label,
    error,
    hasIcon,
    addonLeft,
    addonRight,
    children,
}) => {
    const hasAddons = addonLeft || addonRight;

    return (
        <div className="field">
            <label className="label" htmlFor={id}>
                <div className="has-margin-bottom-1">{label}</div>

                {error && <ErrorInput error={error} />}

                <div className={hasAddons ? 'field has-addons' : 'field'}>
                    {addonRight && <div className="control">{addonRight}</div>}

                    <div
                        className={c('control', { 'has-icons-right': hasIcon })}
                    >
                        {children}
                    </div>

                    {addonLeft && <div className="control">{addonLeft}</div>}
                </div>
            </label>
        </div>
    );
};

InputWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }),
    hasIcon: PropTypes.bool,
    addonLeft: PropTypes.node,
    addonRight: PropTypes.node,
    children: PropTypes.node.isRequired,
};

InputWrapper.defaultProps = {
    error: null,
    hasIcon: false,
    addonLeft: null,
    addonRight: null,
};

export default InputWrapper;
