import PropTypes from 'prop-types';

import FilterList from 'components/search/SearchPage/FilterSidebar/FilterList';

const Slider = require('rc-slider');

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

// // TODO: find solution for rc-slider color with primary

const PRIMARY = '#8175ff';

const month = [];
month[0] = 'Janvier';
month[1] = 'Février';
month[2] = 'Mars';
month[3] = 'Avril';
month[4] = 'Mai';
month[5] = 'Juin';
month[6] = 'Juillet';
month[7] = 'Aout';
month[8] = 'Septembre';
month[9] = 'Octobre';
month[10] = 'Novembre';
month[11] = 'Décembre';

const paramFilter = {
    harvestDate: {
        label: 'Récolte',
        nameFilter: 'harvestDate',
    },
    shelteredSowingDate: {
        label: 'Semis sous abris',
        nameFilter: 'shelteredSowingDate',
    },
    directSowingDate: {
        label: 'Semis direct',
        nameFilter: 'directSowingDate',
    },
};

const FieldFilterDate = ({ type, onSelectedFilter, filter, disabled }) => {
    const { label, nameFilter } = paramFilter[type];

    const handleFilter = selected => {
        const newFilter = { ...filter };
        if (selected[0] === 1 && selected[1] === 12) {
            delete newFilter[nameFilter];
        } else {
            newFilter[nameFilter] = {
                startDate: selected[0],
                endDate: selected[1],
            };
        }
        onSelectedFilter({ filter: newFilter, page: 0 });
    };

    return (
        <FilterList label={label}>
            <div style={{ width: '75%' }}>
                <Range
                    marks={{ 1: { label: 'Jan.' }, 12: { label: 'Dec.' } }}
                    tipFormatter={value => month[value - 1]}
                    onAfterChange={handleFilter}
                    defaultValue={[1, 12]}
                    disabled={disabled}
                    trackStyle={[
                        {
                            backgroundColor: PRIMARY,
                        },
                    ]}
                    handleStyle={[
                        {
                            color: PRIMARY,
                            border: `1px solid ${PRIMARY}`,
                            boxShadow: 'none',
                            shadow: PRIMARY,
                        },
                    ]}
                    pushable={1}
                    step={1}
                    max={12}
                    min={1}
                />
            </div>
        </FilterList>
    );
};

FieldFilterDate.propTypes = {
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

FieldFilterDate.defaultProps = {
    disabled: false,
    filter: {},
};

export default FieldFilterDate;
