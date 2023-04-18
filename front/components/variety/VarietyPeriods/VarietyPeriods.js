import PropTypes from 'prop-types';

import c from 'classnames';

const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
];

const abbrDateFeat = carac => {
    switch (carac) {
        case 'Semis direct':
            return 'S.direct';
        case 'Semis abrité':
            return 'S.abrité';
        default:
            return carac;
    }
};

const dates = seed => [
    { text: 'Semis direct', period: seed.directSowingDate },
    { text: 'Semis abrité', period: seed.shelteredSowingDate },
    { text: 'Récolte', period: seed.harvestDate },
];

const timeFrame = (frames, key) => {
    const seasonArray = [];

    for (let i = 1; i <= 12; i += 1) {
        seasonArray[i] = { selected: false, key: `${key}-${i}` };
    }

    Object.entries(frames).forEach(frame => {
        const { endDate } = frame[1];
        let { startDate } = frame[1];

        while (startDate <= endDate) {
            seasonArray[startDate].selected = true;
            startDate += 1;
        }
    });

    const tdFrame = seasonArray.map(month => {
        return (
            <td
                key={month.key}
                className={c({ 'is-selected': month.selected })}
                style={{ overflow: 'hidden' }}
            />
        );
    });

    return tdFrame;
};

const VarietyPeriods = ({ seed, hiddenFor }) => {
    return (
        <div className={`is-hidden-${hiddenFor}`}>
            <h6 className="has-margin-left-3 is-marginless">
                <p className="subtitle is-size-5">Calendrier</p>
            </h6>
            <div className="column is-variable">
                <table className="table is-fullwidth is-narrow is-hoverable ">
                    <thead>
                        <tr>
                            <th>Mois</th>
                            {months.map(item => (
                                <th className="has-text-centered" key={item}>
                                    <abbr title={item}>{item[0]}</abbr>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dates(seed).map(date => (
                            <tr key={date.text}>
                                <th className="is-hidden-tablet">
                                    {abbrDateFeat(date.text)}
                                </th>
                                <th className="is-hidden-mobile">
                                    {date.text}
                                </th>
                                {timeFrame(date.period, date.text)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

VarietyPeriods.propTypes = {
    seed: PropTypes.objectOf(Object).isRequired,
    hiddenFor: PropTypes.oneOf(['desktop', 'touch', 'tablet', 'mobile', 'none'])
        .isRequired,
};

export default VarietyPeriods;
