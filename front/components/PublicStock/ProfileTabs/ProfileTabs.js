import c from 'classnames';
import css from 'components/PublicStock/ProfileTabs/ProfileTabs.module.scss';
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import sprout from '@iconify/icons-mdi/sprout';
import gift from '@iconify/icons-mdi/gift';

const ProfileTabs = ({ isActive, setIsActive }) => {
    return (
        <div className="container">
            <div className={c('columns')}>
                <div className="column">
                    <div
                        className={c('tabs is-centered is-boxed is-fullwidth')}
                    >
                        <ul>
                            <li
                                onClick={() => setIsActive('Stock')}
                                onKeyDown={() => setIsActive('Stock')}
                                role="tab"
                                tabIndex="0"
                                className={c(css.tab, {
                                    'is-active': isActive === 'Stock',
                                })}
                            >
                                <a
                                    className={c({
                                        'has-text-primary':
                                            isActive === 'Stock',
                                    })}
                                >
                                    <span className="icon is-small">
                                        <Icon icon={sprout} />
                                    </span>
                                    <span>Je propose</span>
                                </a>
                            </li>
                            <li
                                onClick={() => setIsActive('Want')}
                                onKeyDown={() => setIsActive('Want')}
                                role="tab"
                                tabIndex="0"
                                className={c(css.tab, {
                                    'is-active': isActive === 'Want',
                                })}
                            >
                                <a
                                    className={c({
                                        'has-text-primary': isActive === 'Want',
                                    })}
                                >
                                    <span className="icon is-small">
                                        <Icon icon={gift} />
                                    </span>
                                    <span>Je recherche</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileTabs.propTypes = {
    isActive: PropTypes.string,
    setIsActive: PropTypes.func,
};

ProfileTabs.defaultProps = {
    isActive: 'Stock',
    setIsActive: undefined,
};

export default ProfileTabs;
