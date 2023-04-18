import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import css from './Dropdown.module.scss';

const Dropdown = ({ active, data, format, action, loopKey, children }) => {
    const node = useRef();
    const [shouldDisplay, setShouldDisplay] = useState(true);

    useEffect(() => {
        setShouldDisplay(node.current.contains(document.activeElement));
    }, [shouldDisplay]);

    useEffect(() => {
        const handler = event => {
            setShouldDisplay(node.current.contains(event.target));
        };

        document.addEventListener('click', handler);
        document.addEventListener('keyup', handler);

        return () => {
            document.removeEventListener('click', handler);
            document.removeEventListener('keyup', handler);
        };
    }, []);

    return (
        <div
            className={c(css.pedlg__dropdown, 'dropdown', {
                'is-active': shouldDisplay && active,
            })}
            ref={node}
        >
            <div className="dropdown-trigger">{children}</div>

            <div
                className={c(css.menu, 'dropdown-menu')}
                id="dropdown-menu"
                role="menu"
            >
                <div className={c(css.content, 'dropdown-content')}>
                    {data.map((item, index) =>
                        action !== null ? (
                            <a
                                className={c(css.item, 'dropdown-item')}
                                href="#"
                                onClick={event => {
                                    event.preventDefault();
                                    action(item);
                                }}
                                key={item[loopKey] || index}
                            >
                                {format !== null ? format(item) : item}
                            </a>
                        ) : (
                            <span
                                className={c(css.item, 'dropdown-item')}
                                key={item[loopKey] || index}
                            >
                                {format !== null ? format(item) : item}
                            </span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

Dropdown.propTypes = {
    active: PropTypes.bool,
    data: PropTypes.instanceOf(Array),
    format: PropTypes.func,
    action: PropTypes.func,
    loopKey: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
    active: true,
    data: [],
    format: null,
    action: null,
    loopKey: null,
};

export default Dropdown;
