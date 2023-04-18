import PropTypes from 'prop-types';
import c from 'classnames';

import FieldFilterDate from 'components/search/SearchPage/FilterSidebar/FieldFilterDate';
import FieldFilter from 'components/search/SearchPage/FilterSidebar/FieldFilter';

import reloadCircle from '@iconify/icons-ion/reload-circle';
import { Icon } from '@iconify/react';

import Switch from './FieldFilter/Switch';

import css from './FilterSidebar.module.scss';

// TODO: include paramFilter here and send it in prop

const type = {
    filters: [
        'exposition',
        'precocity',
        'waterNeed',
        'growingMethod',
        'soilNature',
        'soilQuality',
    ],
    date: ['shelteredSowingDate', 'directSowingDate', 'harvestDate'],
};

const reload = () => {
    window.location = window.location.pathname;
};

const FilterSidebar = ({
    onSelectedFilter,
    variables,
    loading,
    menuSwitch,
}) => {
    return (
        <aside className={c(css['pedlg__filter-sidebar'], 'menu')}>
            <p className="menu-label">Filtrer par</p>
            <ul className="menu-list">
                {type.filters.map(filter => (
                    <li className="field" key={filter}>
                        <FieldFilter
                            filter={variables && variables.filter}
                            onSelectedFilter={onSelectedFilter}
                            disabled={loading}
                            type={filter}
                        />
                    </li>
                ))}
            </ul>
            <p className="menu-label">Période</p>
            <ul className="menu-list">
                {type.date.map(filter => (
                    <li className="field" key={filter}>
                        <FieldFilterDate
                            filter={variables && variables.filter}
                            onSelectedFilter={onSelectedFilter}
                            disabled={loading}
                            type={filter}
                        />
                    </li>
                ))}
            </ul>
            <div className="table-container">
                {menuSwitch && (
                    <div className="table has-background-white-bis">
                        <p className="menu-label">Disponibilité</p>
                        <div className="menu-list">
                            <Switch
                                isChecked={variables.available}
                                disabled={loading}
                                onSelectedFilter={onSelectedFilter}
                            />
                        </div>
                    </div>
                )}
                <div
                    onKeyPress={reload}
                    onClick={reload}
                    className="table has-text-primary is-clickable has-background-white-bis"
                    role="button"
                    tabIndex={0}
                >
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={reloadCircle} />
                        </span>
                        <span>Effacer les filtres</span>
                    </span>
                </div>
            </div>
        </aside>
    );
};

FilterSidebar.propTypes = {
    onSelectedFilter: PropTypes.func.isRequired,
    variables: PropTypes.shape({
        filter: PropTypes.objectOf(Object),
        available: PropTypes.bool,
    }),
    loading: PropTypes.bool,
    menuSwitch: PropTypes.bool,
};

FilterSidebar.defaultProps = {
    loading: false,
    variables: {
        filter: {},
        available: false,
    },
    menuSwitch: true,
};

export default FilterSidebar;
