import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import c from 'classnames';

import { Icon } from '@iconify/react';
import search from '@iconify/icons-mdi/search';

import css from './SearchBar.module.scss';

const SearchBar = () => {
    const router = useRouter();
    const defaultValue = useSelector(state => state.search);
    const dispatch = useDispatch();
    const { pathname } = router;

    const debounced = useRef(
        debounce(payload => {
            dispatch({ type: 'SEARCH', payload });
        }, 300)
    ).current;

    const goToSearchPage = event => {
        if (
            (event.key === 'Enter' || event.type === 'click') &&
            pathname !== '/search'
        ) {
            event.preventDefault();
            event.stopPropagation();
            router.push('/search');
        }
    };

    return (
        <div
            className={c(
                css['pedlg__search-control'],
                'control',
                'has-icons-right'
            )}
        >
            <input
                className={c(css['search-input'], 'input', 'is-rounded')}
                type="text"
                placeholder="Recherche"
                onKeyDown={goToSearchPage}
                defaultValue={router.pathname === '/search' ? defaultValue : ''}
                onChange={event => debounced(event.target.value)}
            />

            <span
                className="icon is-right is-clickable"
                onClick={goToSearchPage}
                onKeyPress={goToSearchPage}
                role="button"
                tabIndex="0"
            >
                <Icon
                    icon={search}
                    style={{
                        height: '1.25rem',
                        width: '1.25rem',
                    }}
                />
            </span>
        </div>
    );
};

export default SearchBar;
