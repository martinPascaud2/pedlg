import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { GET_ALL_VARIETIES } from 'lib/gql/queries';

import searchIco from '@iconify/icons-mdi/search';

import QueryString from 'query-string';

import FilterSidebar from 'components/search/SearchPage/FilterSidebar';
import SortFilters from 'components/search/SearchPage/SortFilters';
import FilterMenu from 'components/search/SearchPage/FilterMenu';
import SearchList from 'components/search/SearchPage/SearchList';
import nestedToRawObject from 'lib/utils/nestedToRawObject';
import Header from 'components/search/SearchPage/Header';
import Pagination from 'components/Pagination';
import Layout from 'components/Layout';

const parseFilters = (param, key) => {
    const parsedParam = param && param.split(',');
    if (parsedParam && parsedParam.length) {
        return { [key]: parsedParam.map(item => Number(item)) };
    }
    return null;
};

const setVariables = query => {
    const filters = [
        'expositions',
        'precocities',
        'waterNeeds',
        'growingMethods',
        'soilNatures',
        'soilQualities',
        'usages',
    ].map(key => parseFilters(query[key], key));
    return {
        filter: Object.assign({}, ...filters),
        available: query.available === 'true',
        old: query.old === 'true',
        limit: Number(query.limit) || 12,
        sortBy: {
            field: query.field || 'family',
            orderBy: query.orderBy || 'ASC',
        },
        page: Number(query.page) || 0,
    };
};

const convertGqlToQuery = (variables, callback) => {
    const queryConverted = QueryString.stringify(nestedToRawObject(variables), {
        arrayFormat: 'comma',
    });

    callback({ pathname: window.location.pathname, query: queryConverted });
};

const Search = () => {
    const searchedTerm = useSelector(state => state.search);
    const [listed, setList] = useState();
    const router = useRouter();

    const { query } = router;

    const [getVarieties, { loading, data, variables }] = useLazyQuery(
        GET_ALL_VARIETIES,
        {
            variables: setVariables(query),
            onCompleted: res => {
                setList(res?.get?.result);
                convertGqlToQuery(variables, router.replace);
            },
        }
    );

    const handleSearchPage = payload => {
        getVarieties({ variables: { ...variables, ...payload } });
    };

    useEffect(() => {
        handleSearchPage({
            search: searchedTerm ?? query.search,
            page: Number(query.page) || 0,
        });
    }, [searchedTerm]);

    return (
        <Layout title="Recherche">
            <section
                className="section"
                style={{ padding: '3rem 0.2rem', overflow: 'hidden' }}
            >
                <div className="container">
                    <Header title="Recherche" icon={searchIco} />
                    <FilterMenu
                        variables={variables}
                        onSelectedFilter={handleSearchPage}
                        loading={loading}
                        count={data && data?.get?.count}
                        toggle
                        switch={false}
                    />
                    <div className="columns">
                        <div className="column is-one-quarter is-hidden-mobile is-hidden-touch">
                            <FilterSidebar
                                variables={variables}
                                onSelectedFilter={handleSearchPage}
                                loading={loading}
                            />
                        </div>
                        <div className="column">
                            <div className="box">
                                {variables && (
                                    <SortFilters
                                        onSelectedSort={handleSearchPage}
                                        field={variables.sortBy.field}
                                        orderBy={variables.sortBy.orderBy}
                                        limit={variables.limit}
                                        disabled={!data}
                                    />
                                )}
                                <SearchList
                                    loading={loading}
                                    refetch={handleSearchPage}
                                    list={listed}
                                />
                                <Pagination
                                    currentPage={variables && variables.page}
                                    isLoading={loading}
                                    pageCount={
                                        data &&
                                        Math.ceil(
                                            data.get.count / variables.limit
                                        )
                                    }
                                    onPageChange={page => {
                                        handleSearchPage({ page });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Search;
