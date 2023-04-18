import { useRef, useState } from 'react';

import PropTypes from 'prop-types';
import c from 'classnames';

import css from '../FilterSidebar.module.scss';

const Switch = ({
    onSelectedFilter,
    isChecked,
    className,
    switchText,
    disallowText,
    toggle,
}) => {
    const [toggled, toggleSwitch] = useState(isChecked);
    const switchRef = useRef();
    return (
        <a
            className={c(
                'menu-list is-clickable',
                css['has-no-outline'],
                className
            )}
            onClick={() => switchRef.current.click()}
            role="button"
            tabIndex={0}
            onKeyPress={() => switchRef.current.click()}
        >
            <input
                id="switch"
                type="checkbox"
                name="available"
                className="switch is-rounded is-primary"
                onClick={e => {
                    toggleSwitch(e.target.checked);
                    onSelectedFilter({
                        available: e.target.checked,
                        page: 0,
                    });
                }}
                defaultChecked={isChecked}
                ref={switchRef}
            />
            <label htmlFor="available" className="has-text-grey">
                {(() => {
                    if (toggle) {
                        return toggled ? switchText : disallowText;
                    }
                    return switchText;
                })()}
            </label>
        </a>
    );
};

Switch.propTypes = {
    onSelectedFilter: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    className: PropTypes.string,
    switchText: PropTypes.string,
    disallowText: PropTypes.string,
    toggle: PropTypes.bool,
};

Switch.defaultProps = {
    className: 'is-rounded is-primary',
    switchText: 'En stock uniquement',
    disallowText: 'Tout inclus',
    toggle: false,
};

export default Switch;
