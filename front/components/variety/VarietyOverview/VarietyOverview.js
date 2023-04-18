/* eslint no-param-reassign: 0 */
import PropTypes from 'prop-types';

import { useModal } from 'hooks';
import { useSelector } from 'react-redux';

import LoginModal from 'components/auth/LoginModal';
import ButtonAction from 'components/List/ActionList/ButtonAction';
import UpdateStockItem from 'components/settings/StockSettings/UpdateStockItem';
import InsertWantItem from 'components/settings/WishlistSettings/InsertWantItem/InsertWantItem';
import PouchPrinting from 'components/PouchPrinting';

import gift from '@iconify/icons-mdi/gift';
import seedIcon from '@iconify/icons-mdi/seed';
import printerIcon from '@iconify/icons-mdi/printer';

const VarietyOverview = ({ seed, refetch }) => {
    const { openModal } = useModal();
    const { loggedIn } = useSelector(state => state.auth);

    const { family, name, description, latinName, icon } = seed;

    const listActions = item => [
        {
            text: "J'en propose",
            icon: seedIcon,
            className: 'button is-small',
            onClick: () => {
                if (loggedIn) {
                    openModal(
                        <UpdateStockItem
                            item={{
                                variety: { ...item },
                                unit: 'gram',
                            }}
                            onUpdate={refetch}
                            title="Insertion"
                        />,
                        'is-small'
                    );
                } else {
                    openModal(<LoginModal />);
                }
            },
        },
        {
            text: "J'en cherche",
            icon: gift,
            className: 'button is-small is-primary is-outlined',
            onClick: () => {
                if (loggedIn) {
                    openModal(
                        <InsertWantItem
                            item={{
                                variety: { ...item },
                            }}
                            title="Insertion"
                        />,
                        'is-small'
                    );
                } else {
                    openModal(<LoginModal />);
                }
            },
        },
        {
            text: 'Imprimer pochon',
            icon: printerIcon,
            className: 'button is-small',
            onClick: () => {
                if (loggedIn) {
                    openModal(<PouchPrinting seedId={item.id} />, 'is-medium');
                } else {
                    openModal(<LoginModal />);
                }
            },
        },
    ];

    const addDefaultSrc = ev => {
        ev.target.src = '/assets/images/plant_default.jpg';
    };

    return (
        <>
            <div className="columns is-mobile has-margin-3">
                <div className="columns">
                    <div className="column is-two-thirds">
                        <p className="title is-5 is-spaced is-underlined">
                            {family}
                        </p>
                        <p className="title is-capitalized has-text-primary">
                            {name}
                        </p>
                        <p className="subtitle is-6 is-italic">{latinName}</p>
                        <p className="has-text-justified is-hidden-touch">
                            {description || (
                                <span className="is-italic has-text-grey-light">
                                    Description non renseigné.
                                </span>
                            )}
                        </p>
                        <div className="column is-half has-padding-top-8 is-hidden-touch">
                            <div className="columns is-mobile">
                                {listActions(seed).map(act => (
                                    <div
                                        key={act.text}
                                        className="column has-padding-left-0"
                                    >
                                        <ButtonAction
                                            className={act.className}
                                            onClick={act.onClick}
                                            icon={act.icon}
                                            text={act.text}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="column has-text-right iis-one-quarter-tablet">
                        <img
                            onError={addDefaultSrc}
                            src={`/assets/images/family/${icon}.jpg`}
                            alt="no available"
                        />
                    </div>
                </div>
            </div>
            <div className="column is-fullwidth is-hidden-desktop">
                <p className="has-text-justified">{description}</p>
            </div>

            {/* ACTION BUTTONS FOR MOBILE */}
            <div className="column is-hidden-desktop">
                <div className="columns is-mobile has-text-centered">
                    {listActions(seed).map(act => (
                        <div key={act.text} className="column">
                            <ButtonAction
                                className={act.className}
                                onClick={act.onClick}
                                icon={act.icon}
                                text={act.text}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

VarietyOverview.propTypes = {
    seed: PropTypes.objectOf(Object).isRequired,
    refetch: PropTypes.func.isRequired,
};

export default VarietyOverview;
