import { useRef, useState, forwardRef } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import keyb from '@iconify/icons-mdi/keyboard';
import back from '@iconify/icons-mdi/backspace';

import ErrorInput from 'components/Form/ErrorInput';

import css from './AddNewVariety.module.scss';

const VarietyInput = forwardRef(
    ({ formId, label, search, isSelected, onClear, error }, ref) => {
        const [loading, setLoading] = useState(false);

        const debounced = useRef(
            debounce(value => {
                search({ search: value });
                setLoading(false);
            }, 500)
        ).current;

        return (
            <label className="label" htmlFor={`${formId}-0`}>
                <span className="has-margin-bottom-1">{label}</span>
                {error && <ErrorInput error={error} />}

                <div
                    className={c('control', 'has-icons-right', {
                        'is-loading': loading,
                    })}
                >
                    <input
                        ref={ref}
                        id={`${formId}-0`}
                        name="search-variety"
                        className={c('input', css['search-input'], {
                            [css['is-selected']]: isSelected,
                            'is-danger': !!error,
                        })}
                        placeholder="Variété"
                        onChange={event => {
                            setLoading(true);
                            debounced(event.target.value);
                        }}
                        readOnly={isSelected}
                    />

                    <span
                        role="button"
                        className={c('icon', 'is-right', {
                            'is-clickable': isSelected,
                        })}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={onClear}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                onClear();
                            }
                        }}
                    >
                        {!loading && (
                            <Icon
                                className={c({
                                    'has-text-danger': isSelected,
                                })}
                                icon={isSelected ? back : keyb}
                            />
                        )}
                    </span>
                </div>
            </label>
        );
    }
);

VarietyInput.displayName = 'VarietyInput';

VarietyInput.propTypes = {
    formId: PropTypes.string.isRequired,
    label: PropTypes.string,
    search: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
    error: PropTypes.shape({
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        type: PropTypes.string,
    }),
};

VarietyInput.defaultProps = {
    label: null,
    error: null,
};

export default VarietyInput;
