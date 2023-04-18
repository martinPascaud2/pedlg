import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import circleOff from '@iconify/icons-mdi/circle-off-outline';
import circle from '@iconify/icons-mdi/circle-outline';

const SharedInput = ({ formId, label, quantity, sharedQuantity, onChange }) => {
    const max = quantity;
    const shareInput = useRef();

    useEffect(() => {
        if (sharedQuantity > quantity) {
            shareInput.current.value = quantity;
            onChange(quantity);
        }
    }, [onChange, quantity, sharedQuantity]);

    return (
        <label className="label" htmlFor={`${formId}-3`}>
            <span className="has-margin-bottom-1">{label}</span>

            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        id={`${formId}-3`}
                        className="input"
                        name="quantity"
                        type="number"
                        min="0"
                        max={max}
                        step="1"
                        placeholder={label || 'Quantité partagée'}
                        defaultValue={sharedQuantity || null}
                        ref={shareInput}
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
                            onChange(value);
                        }}
                    />
                </div>

                <div className="control">
                    <button
                        type="button"
                        className="button"
                        onClick={event => {
                            event.preventDefault();
                            shareInput.current.value = quantity;
                            onChange(quantity);
                        }}
                        disabled={!quantity || sharedQuantity === quantity}
                    >
                        <Icon icon={circle} />
                    </button>
                </div>
                <div className="control">
                    <button
                        type="button"
                        className="button"
                        onClick={event => {
                            event.preventDefault();
                            shareInput.current.value = 0;
                            onChange(0);
                        }}
                        disabled={sharedQuantity === 0}
                    >
                        <Icon icon={circleOff} />
                    </button>
                </div>
            </div>
        </label>
    );
};

SharedInput.propTypes = {
    formId: PropTypes.string.isRequired,
    label: PropTypes.string,
    quantity: PropTypes.number,
    sharedQuantity: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

SharedInput.defaultProps = {
    label: null,
    sharedQuantity: 0,
    quantity: 0,
};

export default SharedInput;
