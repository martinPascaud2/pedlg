import { useState } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import Filter from 'components/search/SearchPage/FilterSidebar';
import Switch from '../FilterSidebar/FieldFilter/Switch';

const FilterMenu = ({
    variables,
    onSelectedFilter,
    loading,
    count,
    menuSwitch,
}) => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = event => {
        if (
            event.type === 'click' ||
            [' ', 'Enter'].indexOf(event.key) !== -1
        ) {
            setIsMenuActive(!isMenuActive);
        }
    };
    return (
        <div className="is-hidden-desktop has-margin-top-5">
            <div className="columns is-mobile is-vcentered has-background-white has-padding-x-3">
                <div
                    className="column has-text-grey is-two-quarters has-centered-content"
                    style={{ borderRight: '0.1rem solid #ddd' }}
                >
                    {count >= 0 ? (
                        <p>{`${count} résultat${count > 1 ? 's' : ''}`}</p>
                    ) : (
                        <span className="subtitle has-text-justified">
                            Chargement...
                        </span>
                    )}
                </div>
                <div className="column is-narrow">
                    <div className="is-left">
                        <Switch
                            isChecked={variables && variables.available}
                            disabled={loading}
                            onSelectedFilter={onSelectedFilter}
                            switchText="En stock"
                        />
                    </div>
                </div>
                <div className="column is-narrow">
                    <button
                        className={c('button is-small', {
                            'is-primary': isMenuActive,
                        })}
                        onClick={toggleMenu}
                        onKeyDown={toggleMenu}
                        type="button"
                    >
                        Filtres
                    </button>
                </div>
            </div>
            <div
                className={c('box', {
                    'is-hidden': !isMenuActive,
                })}
            >
                <div className="navbar-item has-dropdown is-hoverable is-hidden-desktop">
                    <Filter
                        variables={variables}
                        onSelectedFilter={onSelectedFilter}
                        loading={loading}
                        menuSwitch={menuSwitch}
                    />
                </div>
            </div>
        </div>
    );
};

FilterMenu.propTypes = {
    onSelectedFilter: PropTypes.func.isRequired,
    variables: PropTypes.shape({
        filter: PropTypes.objectOf(Object),
        available: PropTypes.bool,
    }),
    loading: PropTypes.bool,
    count: PropTypes.number,
    menuSwitch: PropTypes.bool,
};

FilterMenu.defaultProps = {
    loading: false,
    variables: {
        filter: {},
        available: false,
    },
    count: -1,
    menuSwitch: false,
};

export default FilterMenu;
