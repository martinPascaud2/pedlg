import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import sortAlphaAsc from '@iconify/icons-mdi/sort-alphabetical-ascending';
import sortAlphaDesc from '@iconify/icons-mdi/sort-alphabetical-descending';
import sortNumAsc from '@iconify/icons-mdi/sort-numeric-ascending';
import sortNumDesc from '@iconify/icons-mdi/sort-numeric-descending';

import css from './SortFilters.module.scss';

const sortFields = [
    { name: 'Famille', value: 'family' },
    { name: 'Variété', value: 'name' },
    { name: 'Ajout', value: 'updatedAt' },
];

const limits = [6, 12, 24, 48];

const SortFilters = ({ onSelectedSort, field, orderBy, limit, disabled }) => {
    const applyFilter = filter => onSelectedSort(filter);

    return (
        <fieldset disabled={disabled} className="menu-label">
            <div className={css['pedlg__sort-filters']}>
                <div className={css.filter}>
                    <div className={css['filter-label']}>Trier par</div>

                    <div className="field has-addons flex-1">
                        <p className="control flex-1">
                            <span
                                className="select is-fullwidth"
                                onChange={event => {
                                    applyFilter({
                                        sortBy: {
                                            field: event.target.value,
                                            orderBy,
                                        },
                                    });
                                }}
                            >
                                <select>
                                    {sortFields.map(item => (
                                        <option
                                            value={item.value}
                                            defaultValue={item.value === field}
                                            key={item.value}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                        <p className="control">
                            <button
                                type="button"
                                className={c('button', {
                                    'is-active': orderBy === 'ASC',
                                })}
                                onClick={() => {
                                    applyFilter({
                                        sortBy: {
                                            field,
                                            orderBy: 'ASC',
                                        },
                                    });
                                }}
                            >
                                <Icon
                                    icon={
                                        field === 'quantity'
                                            ? sortNumAsc
                                            : sortAlphaAsc
                                    }
                                    style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                    }}
                                />
                            </button>
                        </p>
                        <p className="control">
                            <button
                                type="button"
                                className={c('button', {
                                    'is-active': orderBy === 'DESC',
                                })}
                                onClick={() => {
                                    applyFilter({
                                        sortBy: {
                                            field,
                                            orderBy: 'DESC',
                                        },
                                    });
                                }}
                            >
                                <Icon
                                    icon={
                                        field === 'quantity'
                                            ? sortNumDesc
                                            : sortAlphaDesc
                                    }
                                    style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                    }}
                                />
                            </button>
                        </p>
                    </div>
                </div>

                <div className={css.filter}>
                    <div className={css['filter-label']}>Afficher par page</div>
                    <div className="field has-addons flex-1">
                        {limits.map(item => (
                            <p className="control" key={item}>
                                <button
                                    type="button"
                                    className={c('button', {
                                        'is-active': item === limit,
                                    })}
                                    onClick={() => {
                                        applyFilter({ limit: item, page: 0 });
                                    }}
                                >
                                    {item}
                                </button>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

SortFilters.propTypes = {
    onSelectedSort: PropTypes.func.isRequired,
    field: PropTypes.string,
    orderBy: PropTypes.string,
    limit: PropTypes.number,
    disabled: PropTypes.bool,
};

SortFilters.defaultProps = {
    field: 'family',
    orderBy: 'ASC',
    limit: '25',
    disabled: false,
};

export default SortFilters;
