import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import debounce from 'lodash/debounce';

import { Icon } from '@iconify/react';
import sortAlphaAsc from '@iconify/icons-mdi/sort-alphabetical-ascending';
import sortAlphaDesc from '@iconify/icons-mdi/sort-alphabetical-descending';
import sortNumAsc from '@iconify/icons-mdi/sort-numeric-ascending';
import sortNumDesc from '@iconify/icons-mdi/sort-numeric-descending';

import css from './StockFilters.module.scss';

const limits = [6, 12, 24, 48];

const sortFields = [
    { name: 'Famille', value: 'family' },
    { name: 'Variété', value: 'name' },
    { name: 'Quantité', value: 'quantity' },
];

const filtersByTab = {
    Stock: sortFields,
    Want: [sortFields[0], sortFields[1]],
};

const StockFilters = ({ refetch, disabled, variables, tab }) => {
    const { field, orderBy } = variables.sortBy;
    const { limit } = variables;
    const [loading, setLoading] = useState(false);
    const applyFilter = filter => refetch({ ...filter, page: 0 });
    const debounced = useRef(
        debounce(search => {
            applyFilter({ search });
            setLoading(false);
        }, 500)
    ).current;

    return (
        <fieldset disabled={disabled}>
            <div className={c('column', css['pedlg__stock-filters'])}>
                <div className="columns">
                    <div className="column">
                        <div className={css.filter}>
                            <div className={css['filter-label']}>Recherche</div>
                            <div className="field flex-1">
                                <p
                                    className={c('control', {
                                        'is-loading': loading,
                                    })}
                                >
                                    <input
                                        className="input"
                                        placeholder="Rechercher dans l'inventaire"
                                        onChange={event => {
                                            debounced(event.target.value);
                                        }}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="column">
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
                                            {filtersByTab[tab].map(item => (
                                                <option
                                                    value={item.value}
                                                    defaultValue={
                                                        item.value === field
                                                    }
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
                    </div>

                    <div className="column">
                        <div className={css.filter}>
                            <div className={css['filter-label']}>
                                Afficher par page
                            </div>
                            <div className="field has-addons flex-1">
                                {limits.map(item => (
                                    <p className="control" key={item}>
                                        <button
                                            type="button"
                                            className={c('button', {
                                                'is-active': item === limit,
                                            })}
                                            onClick={() => {
                                                applyFilter({ limit: item });
                                            }}
                                        >
                                            {item}
                                        </button>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

StockFilters.propTypes = {
    variables: PropTypes.shape({
        limit: PropTypes.number.isRequired,
        sortBy: PropTypes.shape({
            field: PropTypes.string.isRequired,
            orderBy: PropTypes.string.isRequired,
        }),
    }).isRequired,
    refetch: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    tab: PropTypes.string.isRequired,
};

StockFilters.defaultProps = {
    disabled: false,
};

export default StockFilters;
