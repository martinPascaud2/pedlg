import PropTypes from 'prop-types';

import c from 'classnames';

import { InlineIcon } from '@iconify/react';

import sunIcon from '@iconify/icons-icomoon-free/sun';
import waterDrop from '@iconify/icons-jam/water-drop';
import plantLine from '@iconify/icons-ri/plant-line';
import mountain15 from '@iconify/icons-maki/mountain-15';
import sharpGrain from '@iconify/icons-ic/sharp-grain';
import calendarMonth from '@iconify/icons-mdi/calendar-month';

const culture = seed => [
    {
        text: 'Exposition',
        carac: seed.expositions,
        icon: sunIcon,
    },
    {
        text: 'Besoin en eau',
        carac: seed.waterNeeds,
        icon: waterDrop,
    },
    {
        text: 'Mode de culture',
        carac: seed.growingMethods,
        icon: plantLine,
    },
    {
        text: 'Qualité du sol',
        carac: seed.soilQualities,
        icon: sharpGrain,
    },
    {
        text: 'Nature du sol',
        carac: seed.soilNatures,
        icon: mountain15,
    },
    {
        text: 'Précocité',
        carac: seed.precocities,
        icon: calendarMonth,
    },
];

const VarietyInfos = ({ hiddenFor, seed }) => {
    return (
        <div className={`is-hidden-${hiddenFor}`}>
            <h6 className="has-margin-left-3 is-marginless">
                <p className="subtitle is-size-5">Caractéristiques</p>
            </h6>
            {seed &&
                culture(seed).map(item => (
                    <div
                        key={item.text}
                        className={c('columns', 'is-gapless', 'has-margin-3')}
                    >
                        <div className="column">
                            <p className="is-size-6 ">
                                <InlineIcon icon={item.icon} width={15} />
                                <span className="has-margin-left-1 has-margin-right-2">
                                    {`${item.text}:`}
                                </span>
                                <span className="is-size-6">
                                    {item.carac.length ? (
                                        item.carac.map((subItem, index) => (
                                            <span
                                                key={subItem.nameFr}
                                                className="has-text-weight-bold"
                                            >
                                                {index
                                                    ? `, ${subItem.nameFr}`
                                                    : `${subItem.nameFr}`}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="is-italic has-text-grey-light">
                                            Non renseigné
                                        </span>
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

VarietyInfos.propTypes = {
    hiddenFor: PropTypes.oneOf(['desktop', 'touch', 'tablet', 'mobile'])
        .isRequired,
    seed: PropTypes.objectOf(Object).isRequired,
};

export default VarietyInfos;
