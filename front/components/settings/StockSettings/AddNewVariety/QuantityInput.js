import PropTypes from 'prop-types';
import c from 'classnames';

import ErrorInput from 'components/Form/ErrorInput';

const QuantityInput = ({ formId, label, quantity, unit, onChange, errors }) => {
    const max = 65535;

    return (
        <label
            className="label"
            htmlFor={`${formId}-${errors.unit ? '2' : '1'}`}
        >
            <span className="has-margin-bottom-1">{label}</span>
            {errors.quantity && <ErrorInput error={errors.quantity} />}
            {errors.unit && <ErrorInput error={errors.unit} />}

            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        id={`${formId}-1`}
                        className={c('input', {
                            'is-danger': !!errors.quantity,
                        })}
                        name="quantity"
                        type="number"
                        min="0"
                        max={max}
                        step="1"
                        placeholder={label || 'Quantité'}
                        defaultValue={quantity || null}
                        onKeyDown={event => {
                            const input = event.target;

                            if (input.value === '') {
                                input.value = 0;
                            }
                        }}
                        onChange={event => {
                            const input = event.target;
                            let value = Number(input.value);

                            if (value > max) {
                                value = max;
                            } else if (value <= 0) {
                                value = 0;
                            }

                            input.value = value;
                            onChange('quantity', value);
                        }}
                    />
                </div>

                <div className="control">
                    <div
                        className={c('select', { 'is-danger': !!errors.unit })}
                    >
                        <select
                            id={`${formId}-2`}
                            name="unit"
                            defaultValue={unit}
                            onChange={event => {
                                onChange('unit', event.target.value);
                            }}
                        >
                            <option value="gram">gramme(s)</option>
                            <option value="number">graine(s)</option>
                            <option value="packet">pochon(s)</option>
                            <option value="bulb">bulbe(s)</option>
                            <option value="stolon">stolon(s)</option>
                            <option value="plant">plant(s)</option>
                            <option value="cutting">bouture(s)</option>
                        </select>
                    </div>
                </div>
            </div>
        </label>
    );
};

const errorShape = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.string,
};

QuantityInput.propTypes = {
    formId: PropTypes.string.isRequired,
    label: PropTypes.string,
    quantity: PropTypes.number,
    unit: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        quantity: PropTypes.shape(errorShape),
        unit: PropTypes.shape(errorShape),
    }),
};

QuantityInput.defaultProps = {
    label: null,
    quantity: 0,
    unit: 'gram',
    errors: {
        quantity: null,
        unit: null,
    },
};

export default QuantityInput;
