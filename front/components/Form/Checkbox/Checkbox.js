import PropTypes from 'prop-types';
import c from 'classnames';

import ErrorInput from 'components/Form/ErrorInput';

import css from './Checkbox.module.scss';

const Checkbox = ({ id, name, register, error, checked, children }) => (
    <div className="field">
        <label htmlFor={id} className={c(css.checkbox, { 'is-danger': error })}>
            {error && <ErrorInput error={error} />}

            <div className="is-flex">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    ref={register}
                    defaultChecked={checked}
                />
                <span>{children}</span>
            </div>
        </label>
    </div>
);

Checkbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    register: PropTypes.func,
    error: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
    }),
    checked: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Checkbox.defaultProps = {
    id: null,
    register: null,
    error: null,
    checked: false,
};

export default Checkbox;
