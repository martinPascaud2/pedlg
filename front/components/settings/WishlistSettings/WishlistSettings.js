import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Icon } from '@iconify/react';
import gift from '@iconify/icons-mdi/gift';
import sprout from '@iconify/icons-mdi/sprout';
import corn from '@iconify/icons-mdi/corn';
import seed from '@iconify/icons-mdi/seed';
import close from '@iconify/icons-mdi/close-thick';
import plus from '@iconify/icons-mdi/plus';

import { useModal } from 'hooks';
import { GET_WANT } from 'lib/gql/queries';

import { List, ListItem, ListCol } from 'components/List';
import Pagination from 'components/Pagination';
import StockFilters from 'components/settings/StockSettings/StockFilters';
import AddWishVariety from 'components/settings/WishlistSettings/AddWishVariety';
import RemoveListItem from 'components/settings/WishlistSettings/RemoveListItem';

const WishlistSettings = () => {
    const { openModal } = useModal();
    const [isAdding, setIsAdding] = useState(false);
    const { variables, loading, data, refetch } = useQuery(GET_WANT, {
        variables: {
            sortBy: {
                field: 'family',
                orderBy: 'ASC',
            },
            search: '',
            page: 0,
            limit: 6,
        },
        fetchPolicy: 'cache-and-network',
    });

    const listActions = item => [
        {
            text: 'Détails',
            icon: sprout,
            onClick: () => {
                window.location.href = `${process.env.APP_URL}/seed/${item.variety.id}`;
            },
        },
        {
            text: 'Retirer',
            icon: close,
            color: 'is-text',
            onClick: () => {
                openModal(
                    <RemoveListItem
                        variety={item.variety}
                        onUpdate={refetch}
                    />,
                    'is-small'
                );
            },
        },
    ];

    const wishNumber = data?.getWant?.count ? data?.getWant?.count : 0;

    return (
        <>
            <div className="box">
                {/* TODO: refactor to be done! Just to have something functional to get user feedback */}
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={gift}
                                className="has-background-dark has-radius-small"
                            />
                        </span>
                        Je recherche ces variétés
                    </span>
                </h5>
                {wishNumber > 5 && (
                    <StockFilters
                        refetch={refetch}
                        field={variables.sortBy.field}
                        orderBy={variables.sortBy.orderBy}
                        limit={variables.limit}
                        disabled={!data}
                    />
                )}

                <hr />

                <List loading={loading}>
                    {data?.getWant?.want.map(item => (
                        <ListItem key={item.id} actions={listActions(item)}>
                            <ListCol icon={corn}>{item.variety.family}</ListCol>
                            <ListCol icon={seed}>{item.variety.name}</ListCol>
                        </ListItem>
                    ))}
                </List>

                {isAdding ? (
                    <AddWishVariety
                        onSuccess={() => {
                            refetch();
                            setIsAdding(false);
                            setIsAdding(true);
                        }}
                        selfClose={() => setIsAdding(!isAdding)}
                    />
                ) : (
                    <button
                        type="button"
                        className="button is-primary"
                        onClick={event => {
                            event.preventDefault();
                            setIsAdding(!isAdding);
                        }}
                    >
                        <span className="icon is-small">
                            <Icon icon={plus} />
                        </span>
                        <span>Ajouter une variété</span>
                    </button>
                )}

                <Pagination
                    currentPage={variables.page}
                    pageCount={
                        data && Math.ceil(data.getWant.count / variables.limit)
                    }
                    onPageChange={page => refetch({ page })}
                    isLoading={loading}
                />
            </div>
        </>
    );
};

export default WishlistSettings;
