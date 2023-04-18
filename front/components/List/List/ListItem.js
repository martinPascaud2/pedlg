import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';

import css from './List.module.scss';

const ListItem = ({
    actions,
    empty,
    loader,
    children,
    onClick,
    className,
    setPreview,
    icon,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const node = useRef();

    useEffect(() => {
        const handler = event => {
            setIsSelected(node.current.contains(event.target));
        };

        document.addEventListener('keyup', handler);

        return () => {
            document.removeEventListener('keyup', handler);
        };
    }, []);

    return (
        <li
            role="row"
            className={c(css.item, className, {
                [css.loader]: loader,
                [css['is-empty']]: empty,
                [css['has-actions']]: !!actions.length,
                [css['show-actions']]: !!actions.length && isSelected,
            })}
            tabIndex={0}
            onClick={onClick}
            onKeyPress={() => {}}
            ref={node}
            onMouseEnter={() => (setPreview && icon ? setPreview(icon) : null)}
            onMouseLeave={() => (setPreview ? setPreview() : null)}
        >
            {children}

            {actions.length > 0 && (
                <div className={c(css.actions, 'buttons')}>
                    {actions.map(action => (
                        <button
                            key={action.text}
                            type="button"
                            className={c(
                                css.action,
                                'button',
                                'is-small',
                                action.color
                            )}
                            onClick={action.onClick}
                        >
                            {action.icon && (
                                <span className="icon">
                                    <Icon icon={action.icon} />
                                </span>
                            )}
                            <span>{action.text}</span>
                        </button>
                    ))}
                </div>
            )}
        </li>
    );
};

ListItem.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            color: PropTypes.string,
            icon: PropTypes.instanceOf(Object),
            onClick: PropTypes.func,
        })
    ),
    empty: PropTypes.bool,
    loader: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    setPreview: PropTypes.func,
    icon: PropTypes.string,
};

ListItem.defaultProps = {
    actions: [],
    empty: false,
    loader: false,
    onClick: () => {},
    className: '',
    setPreview: null,
    icon: '',
};

export default ListItem;
