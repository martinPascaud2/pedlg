import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import QueryString from 'query-string';

import {
    GET_PUBLIC_STOCK_LIST,
    GET_PUBLIC_WANT_LIST,
    GET_USER,
} from 'lib/gql/queries';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

import StockFilters from 'components/PublicStock/StockFilters';
import nestedToRawObject from 'lib/utils/nestedToRawObject';

import Pagination from 'components/Pagination';

import c from 'classnames';
import css from 'components/PublicStock/Collection/Collection.module.scss';
import PublicList from './PublicList';

const request = {
    Stock: GET_PUBLIC_STOCK_LIST,
    Want: GET_PUBLIC_WANT_LIST,
};

const addParamToQuery = variables => {
    const queryConverted = QueryString.stringify(nestedToRawObject(variables), {
        arrayFormat: 'comma',
    });
    window.history.replaceState(variables, null, `?${queryConverted}`);
};

const setVariables = query => {
    return {
        hashId: query.hashId,
        sortBy: {
            field: query.field || 'family',
            orderBy: query.orderBy || 'ASC',
        },
        search: query.search || '',
        limit: Number(query.limit) || 25,
        page: Number(query.page) || 0,
    };
};

const Collection = ({ tab, isActive, setPreview }) => {
    const router = useRouter();
    const { query } = router;
    const { hashId } = query;

    const { loading: userLoading, data: userData } = useQuery(GET_USER, {
        variables: { hashId },
    });

    const [
        getList,
        { variables, loading, data, refetch },
    ] = useLazyQuery(request[tab], { variables: setVariables(query) });

    if (variables && isActive) addParamToQuery({ ...variables, tab });

    useEffect(() => {
        if (isActive) {
            getList({ variables });
        }
    }, [isActive]);

    if (userLoading) return null;

    return (
        <div className={c('container', { 'is-hidden': !isActive })}>
            {variables && (
                <div className="box">
                    <div className="columns is-vcentered">
                        <div className="column is-narrow">
                            <StockFilters
                                className={css['pedlg__stock-filters']}
                                refetch={refetch}
                                variables={variables}
                                disabled={!data}
                                tab={tab}
                            />
                        </div>
                    </div>

                    <div className="container ">
                        <div className="columns ">
                            <div className="column ">
                                <PublicList
                                    loading={loading}
                                    list={data?.list[tab]}
                                    userData={userData.info}
                                    setPreview={setPreview}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <Pagination
                            currentPage={variables.page}
                            pageCount={
                                data &&
                                Math.ceil(data.list.count / variables.limit)
                            }
                            onPageChange={page => refetch({ page })}
                            isLoading={loading}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

Collection.propTypes = {
    tab: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    setPreview: PropTypes.func,
};

Collection.defaultProps = {
    setPreview: null,
};

export default Collection;
