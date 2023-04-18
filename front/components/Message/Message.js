import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import info from '@iconify/icons-mdi/information';
import warning from '@iconify/icons-mdi/alert';
import danger from '@iconify/icons-mdi/close-octagon';

const icons = {
    'is-info': info,
    'is-warning': warning,
    'is-danger': danger,
};

const Message = ({ color, size, noIcon, children }) => (
    <article className={c('message', size, color)}>
        <div className="message-body">
            {noIcon ? (
                children
            ) : (
                <span className="icon-wrapper">
                    <span className="icon">
                        <Icon
                            icon={
                                icons[color && icons[color] ? color : 'is-info']
                            }
                            style={{ width: '1rem', height: '1rem' }}
                        />
                    </span>

                    <span className="has-padding-left-2">{children}</span>
                </span>
            )}
        </div>
    </article>
);

Message.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    noIcon: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Message.defaultProps = {
    color: null,
    size: null,
    noIcon: false,
};

export default Message;
