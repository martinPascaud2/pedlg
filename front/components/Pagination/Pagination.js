import PropTypes from 'prop-types';
import c from 'classnames';

import { Icon } from '@iconify/react';
import left from '@iconify/icons-mdi/arrow-left-thick';
import right from '@iconify/icons-mdi/arrow-right-thick';
import dots from '@iconify/icons-mdi/dots-horizontal';

import css from './Pagination.module.scss';

const getRange = (start, end) => {
    return Array(end - start + 1)
        .fill()
        .map((v, i) => i + start);
};

const paginate = (currentPage, pageCount) => {
    let delta;
    let pages;

    if (pageCount <= 7) {
        // delta === 7: [1 2 3 4 5 6 7]
        delta = 7;
    } else {
        // delta === 2: [1 ... 4 5 6 ... 10]
        // delta === 4: [1 2 3 4 5 ... 10]
        delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
    }

    const range = {
        start: Math.round(currentPage - delta / 2),
        end: Math.round(currentPage + delta / 2),
    };

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
        range.start += 1;
        range.end += 1;
    }

    if (currentPage > delta) {
        pages = getRange(
            Math.min(range.start, pageCount - delta),
            Math.min(range.end, pageCount)
        );
    } else {
        pages = getRange(1, Math.min(pageCount, delta + 1));
    }

    const withDots = (value, pair) =>
        pages.length + 1 !== pageCount ? pair : [value];

    if (pages[0] !== 1) {
        pages = withDots(1, [1, '...']).concat(pages);
    }

    if (pages[pages.length - 1] < pageCount) {
        pages = pages.concat(withDots(pageCount, ['...', pageCount]));
    }

    return pages;
};

const Pagination = ({ currentPage, pageCount, onPageChange, isLoading }) => {
    const handler = (event, page) => {
        if (event.type === 'click' || event.key === 'Enter') {
            if (
                !isLoading &&
                currentPage !== page &&
                page < pageCount &&
                page >= 0
            ) {
                onPageChange(page);
            }
        }
    };

    const PageLinks = () => {
        const pages = paginate(currentPage + 1, pageCount);

        return pages.map((page, index) =>
            page === '...' ? (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                    <span className="pagination-ellipsis">
                        <Icon icon={dots} />
                    </span>
                </li>
            ) : (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                    <a
                        role="button"
                        className={c('pagination-link', {
                            'is-current': page - 1 === currentPage,
                        })}
                        tabIndex="0"
                        aria-label={`Goto page ${page}`}
                        onClick={event => handler(event, page - 1)}
                        onKeyDown={event => handler(event, page - 1)}
                    >
                        {page}
                    </a>
                </li>
            )
        );
    };

    return (
        <nav
            className={c(css.pedlg__pagination, 'pagination')}
            role="navigation"
            aria-label="pagination"
        >
            <a
                role="button"
                className="pagination-previous"
                onClick={event => handler(event, currentPage - 1)}
                onKeyDown={event => handler(event, currentPage - 1)}
                disabled={currentPage <= 0}
            >
                <Icon icon={left} />
            </a>
            <a
                role="button"
                className="pagination-next"
                onClick={event => handler(event, currentPage + 1)}
                onKeyDown={event => handler(event, currentPage + 1)}
                disabled={currentPage + 1 >= pageCount}
            >
                <Icon icon={right} />
            </a>

            <ul className="pagination-list">
                {pageCount > 1 && <PageLinks />}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    pageCount: PropTypes.number,
    onPageChange: PropTypes.func,
    isLoading: PropTypes.bool,
};

Pagination.defaultProps = {
    currentPage: 0,
    pageCount: null,
    onPageChange: () => {},
    isLoading: false,
};

export default Pagination;
