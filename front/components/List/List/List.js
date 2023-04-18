import { useState } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import spin from '@iconify/icons-mdi/loading';
import list from '@iconify/icons-mdi/view-agenda';
import card from '@iconify/icons-mdi/view-grid';

import Item from './ListItem';

import css from './List.module.scss';

const List = ({
    loading,
    defaultView,
    emptyItem,
    children,
    viewMode,
    emptyText,
}) => {
    const viewIcons = { list, card };
    const [view, setView] = useState(defaultView);

    return (
        <>
            {viewMode && (
                <div className="has-margin-bottom-1 is-hidden-mobile">
                    <a
                        role="button"
                        className="button is-small is-text has-text-dark"
                        href="#"
                        onClick={event => {
                            event.preventDefault();
                            setView(value =>
                                value === 'list' ? 'card' : 'list'
                            );
                        }}
                        tabIndex={0}
                    >
                        <span className="icon">
                            <Icon
                                icon={viewIcons[view]}
                                style={{ fontSize: '1.25rem' }}
                            />
                        </span>
                        <span>Changer la vue</span>
                    </a>
                </div>
            )}

            <ul
                className={c(css.pedlg__list, css[`is-${view}`], {
                    [css['is-loading']]: loading,
                })}
            >
                {loading && (!children || !children.length) && (
                    <Item empty loader>
                        <Icon
                            icon={spin}
                            className="is-spinning"
                            style={{
                                fontSize: '1.5em',
                            }}
                        />
                    </Item>
                )}

                {!loading &&
                    (!children || !children.length) &&
                    (emptyItem || <Item empty>{emptyText}</Item>)}

                {children}
            </ul>
        </>
    );
};

List.propTypes = {
    defaultView: PropTypes.oneOf(['card', 'list']),
    emptyText: PropTypes.string,
    emptyItem: PropTypes.node,
    children: PropTypes.node,
    viewMode: PropTypes.bool,
    loading: PropTypes.bool,
};

List.defaultProps = {
    loading: false,
    emptyItem: null,
    emptyText: 'Aucun résultat',
    defaultView: 'list',
    viewMode: true,
    children: null,
};

export default List;
