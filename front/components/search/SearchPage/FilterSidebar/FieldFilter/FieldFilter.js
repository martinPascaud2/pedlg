import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ItemField from 'components/search/SearchPage/FilterSidebar/FieldFilter/ItemField';
import FilterList from 'components/search/SearchPage/FilterSidebar/FilterList';

const query = gql`
    query GetField($field: Fields!) {
        field: getFields(field: $field) {
            nameFr
            id
        }
    }
`;

const paramFilter = {
    exposition: {
        label: 'Exposition',
        field: 'Exposition',
        nameFilter: 'expositions',
    },
    precocity: {
        label: 'Précocité',
        field: 'Precocity',
        nameFilter: 'precocities',
    },
    growingMethod: {
        label: 'Type de culture',
        field: 'GrowingMethod',
        nameFilter: 'growingMethods',
    },
    soilNature: {
        label: 'Nature du sol',
        field: 'SoilNature',
        nameFilter: 'soilNatures',
    },
    soilQuality: {
        label: 'Qualité du sol',
        field: 'SoilQuality',
        nameFilter: 'soilQualities',
    },
    waterNeed: {
        label: 'Besoin en eau',
        field: 'WaterNeed',
        nameFilter: 'waterNeeds',
    },
};

const FieldFilter = ({ type, onSelectedFilter, filter, disabled }) => {
    const { label, field, nameFilter } = paramFilter[type];
    const { loading, error, data } = useQuery(query, {
        variables: {
            field,
        },
    });

    const handleFilter = selected => {
        const newFilter = { ...filter };
        if (!newFilter[nameFilter]) {
            newFilter[nameFilter] = [];
            newFilter[nameFilter].push(selected);
        } else if (newFilter[nameFilter].includes(selected)) {
            const index = newFilter[nameFilter].indexOf(selected);

            if (index !== -1) newFilter[nameFilter].splice(index, 1);
            if (!newFilter[nameFilter].length) {
                delete newFilter[nameFilter];
            }
        } else {
            newFilter[nameFilter].push(selected);
        }
        onSelectedFilter({ filter: newFilter, page: 0 });
    };

    const selectedFilter = filter[paramFilter[type].nameFilter] || [];

    return error ? null : (
        <FilterList label={label} active={!!selectedFilter.length}>
            <fieldset disabled={disabled}>
                <div className={`checkbox ${loading ? 'is-loading' : ''}`}>
                    {data &&
                        data.field.map(item => {
                            let isChecked = false;
                            if (selectedFilter)
                                isChecked = selectedFilter.includes(item.id);

                            return (
                                <ItemField
                                    {...item}
                                    key={item.nameFr}
                                    handleFilter={handleFilter}
                                    isChecked={isChecked}
                                />
                            );
                        })}
                </div>
            </fieldset>
        </FilterList>
    );
};

FieldFilter.propTypes = {
    type: PropTypes.string.isRequired,
    onSelectedFilter: PropTypes.func.isRequired,
    filter: PropTypes.shape({
        sortBy: PropTypes.shape({
            field: PropTypes.string,
            orderBy: PropTypes.string,
        }),
        search: PropTypes.string,
        limit: PropTypes.number,
        page: PropTypes.number,
        filter: PropTypes.objectOf(Object),
    }),
    disabled: PropTypes.bool,
};

FieldFilter.defaultProps = {
    filter: {},
    disabled: false,
};

export default FieldFilter;
