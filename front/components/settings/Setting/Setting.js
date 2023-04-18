import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import edit from '@iconify/icons-mdi/pencil';

import css from './Setting.module.scss';

const ActionableSetting = ({ action, children }) => {
    const doAction = event => {
        if (
            event.type === 'click' ||
            [' ', 'Enter'].indexOf(event.key) !== -1
        ) {
            action();
        }
    };

    return (
        <div
            className={c(
                'columns',
                'is-clickable',
                'is-relative',
                css['pedlg__actionable-setting']
            )}
            role="button"
            tabIndex="0"
            onClick={doAction}
            onKeyDown={doAction}
        >
            {children}
        </div>
    );
};

ActionableSetting.propTypes = {
    action: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const Setting = ({ label, action, children }) => {
    const body = (
        <>
            <div className="column is-one-third-tablet is-one-quarter-desktop">
                <div className="has-text-weight-bold">{label}</div>
            </div>

            <div className={c('column', css['pedlg__setting-field'])}>
                <div className={css['pedlg__setting-value']}>
                    {children || (
                        <span className="is-italic has-text-grey-light">
                            Non renseigné.
                        </span>
                    )}
                </div>
            </div>

            {action && (
                <a
                    className={c(
                        'tag',
                        'is-primary',
                        'is-rounded',
                        css['pedlg__setting-edit']
                    )}
                >
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon icon={edit} />
                        </span>
                        Modifier
                    </span>
                </a>
            )}
        </>
    );

    return action ? (
        <ActionableSetting action={action}>{body}</ActionableSetting>
    ) : (
        <div className="columns">{body}</div>
    );
};

Setting.propTypes = {
    label: PropTypes.node.isRequired,
    action: PropTypes.func,
    children: PropTypes.node,
};

Setting.defaultProps = {
    children: null,
    action: null,
};

export default Setting;
