import PropTypes from 'prop-types';
import c from 'classnames';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks';
import LoginModal from 'components/auth/LoginModal';

import { Icon } from '@iconify/react';

import css from './List.module.scss';

const ListCol = ({ cols, icon, align, children, hRef, mustCo }) => {
    const { loggedIn } = useSelector(state => state.auth);
    const { openModal } = useModal();
    const allowed =
        mustCo === 'false' ||
        mustCo === undefined ||
        (mustCo === 'true' && loggedIn);
    const loginModal = () =>
        allowed === false ? openModal(<LoginModal />) : null;

    return (
        <a
            className={c(
                css['list-col'],
                {
                    [css[`is-${cols}`]]: !!cols,
                    [css[`is-aligned-${align}`]]: align,
                },
                'has-text-grey-dark'
            )}
            href={
                hRef !== undefined && hRef !== null && allowed === true
                    ? `/${hRef}`
                    : null
            }
            onClick={() => loginModal()}
        >
            {icon && (
                <div className="icon has-margin-right-2">
                    <Icon
                        icon={icon}
                        style={{
                            fontSize: '1.15rem',
                        }}
                    />
                </div>
            )}

            {children}
        </a>
    );
};

ListCol.propTypes = {
    cols: PropTypes.number,
    icon: PropTypes.instanceOf(Object),
    align: PropTypes.string,
    children: PropTypes.node,
    mustCo: PropTypes.string,
    hRef: PropTypes.string,
};

ListCol.defaultProps = {
    cols: null,
    icon: null,
    align: 'left',
    children: null,
    mustCo: 'false',
    hRef: null,
};

export default ListCol;
