import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import down from '@iconify/icons-mdi/chevron-down';
import right from '@iconify/icons-mdi/chevron-right';

const MenuList = ({ label, children, active }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = event => {
        if (
            event.type === 'click' ||
            [' ', 'Enter'].indexOf(event.key) !== -1
        ) {
            setIsCollapsed(!isCollapsed);
        }
    };

    useEffect(() => {
        if (active) setIsCollapsed(!active);
    }, [active]);

    return (
        <>
            <a
                role="button"
                className="menu-label is-block"
                tabIndex="0"
                onClick={toggleCollapse}
                onKeyDown={toggleCollapse}
                aria-label="menu"
                aria-expanded={!isCollapsed}
            >
                {label}
                <span className="icon is-pulled-right">
                    <Icon
                        icon={isCollapsed ? right : down}
                        style={{ width: '1.25rem', height: '1.25rem' }}
                    />
                </span>
            </a>
            <ul className={c('menu-list', { 'is-hidden': isCollapsed })}>
                {children}
            </ul>
        </>
    );
};

MenuList.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    active: PropTypes.bool,
};

MenuList.defaultProps = {
    children: null,
    active: false,
};

export default MenuList;
