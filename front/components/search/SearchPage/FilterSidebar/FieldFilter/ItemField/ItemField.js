import { useState, useRef } from 'react';

import PropTypes from 'prop-types';

import c from 'classnames';

import css from '../../FilterSidebar.module.scss';

const ucFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const ItemField = ({ id, nameFr, handleFilter, isChecked }) => {
    const [checked, setCheck] = useState(isChecked);
    const refCheckbox = useRef();

    const onSelect = () => {
        refCheckbox.current.click();
    };

    const handleRadio = event => {
        handleFilter(parseInt(event.target.id, 10));
        setCheck(!checked);
    };

    return (
        <div
            className={c('menu-list is-clickable', css['has-no-outline'])}
            onKeyPress={onSelect}
            onClick={onSelect}
            role="button"
            tabIndex={0}
        >
            <span className="checkbox">
                <input
                    onChange={handleRadio}
                    checked={checked ? 'checked' : ''}
                    style={{ marginRight: '0.5rem' }}
                    ref={refCheckbox}
                    name={nameFr}
                    type="radio"
                    id={id}
                />
                <label className="is-clickable" htmlFor={id}>
                    {ucFirst(nameFr)}
                </label>
            </span>
        </div>
    );
};

ItemField.propTypes = {
    handleFilter: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    nameFr: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default ItemField;
