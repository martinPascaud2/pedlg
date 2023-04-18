import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { Icon } from '@iconify/react';
import sprout from '@iconify/icons-mdi/sprout';
import plus from '@iconify/icons-mdi/plus';
import corn from '@iconify/icons-mdi/corn';
import seed from '@iconify/icons-mdi/seed';
import pencil from '@iconify/icons-mdi/pencil';
import close from '@iconify/icons-mdi/close-thick';
import hand from '@iconify/icons-mdi/hand-heart';
import printerIcon from '@iconify/icons-mdi/printer';

import { useModal } from 'hooks';
import { formattedQuantity, units } from 'lib/utils/formattedQuantity';
import { GET_STOCK } from 'lib/gql/queries';

import { List, ListItem, ListCol } from 'components/List';

import Pagination from 'components/Pagination';
import PouchPrinting from 'components/PouchPrinting';
import StockFilters from 'components/settings/StockSettings/StockFilters';
import AddNewVariety from 'components/settings/StockSettings/AddNewVariety';
import UpdateStockItem from 'components/settings/StockSettings/UpdateStockItem';
import RemoveStockItem from 'components/settings/StockSettings/RemoveStockItem';

import c from 'classnames';
import css from './StockSettings.module.scss';

const StockSettings = () => {
    const router = useRouter();
    const { openModal } = useModal();
    const [isAdding, setIsAdding] = useState(false);
    const { variables, loading, data, refetch } = useQuery(GET_STOCK, {
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
                router.push(
                    `/seed/${item.variety.id}`,
                    `/variete/${item.variety.id}`
                );
            },
        },
        {
            text: 'Modifier',
            icon: pencil,
            onClick: () => {
                openModal(
                    <UpdateStockItem
                        title="Modification"
                        item={item}
                        onUpdate={refetch}
                        shouldRemove
                    />,
                    'is-small'
                );
            },
        },
        {
            text: 'Imprimer pochon',
            icon: printerIcon,
            className: 'button is-small',
            onClick: () => {
                openModal(
                    <PouchPrinting seedId={item.variety.id} />,
                    'is-medium'
                );
            },
        },
        {
            text: 'Retirer',
            icon: close,
            color: 'is-text',
            onClick: () => {
                openModal(
                    <RemoveStockItem
                        variety={item.variety}
                        onUpdate={refetch}
                    />,
                    'is-small'
                );
            },
        },
    ];

    const stockNumber = data?.getStock?.count ? data?.getStock?.count : 0;

    return (
        <>
            {stockNumber < 6 && (
                <>
                    <div className="is-size-5 has-text-centered">
                        Remplissez vos listes et partagez-les sur Facebook !
                    </div>
                    <div className={css.progressWrapper}>
                        <progress
                            className={c('progress is-primary', css.progress)}
                            value={stockNumber}
                            max="5"
                        />
                        <p
                            className={c(
                                'is-size-5 has-text-white',
                                css.progressValue
                            )}
                        >
                            {stockNumber}
                            {' / 5'}
                        </p>
                    </div>
                </>
            )}
            <div className="box">
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={sprout}
                                className="has-background-dark has-radius-small"
                            />
                        </span>
                        Je propose ces variétés
                    </span>
                </h5>

                {stockNumber > 5 && (
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
                    {data?.getStock?.stock.map(item => (
                        <ListItem key={item.id} actions={listActions(item)}>
                            <ListCol icon={corn}>{item.variety.family}</ListCol>

                            <ListCol icon={seed}>{item.variety.name}</ListCol>

                            <ListCol cols={3} icon={units[item.unit].icon}>
                                <span className="has-text-weight-bold">
                                    {formattedQuantity(
                                        item.unit,
                                        item.quantity
                                    )}
                                    {units[item.unit].symbol(item.quantity)}
                                </span>
                            </ListCol>

                            <ListCol cols={2} icon={item.shared ? hand : null}>
                                {item.shared ? (
                                    <>
                                        {formattedQuantity(
                                            item.unit,
                                            item.sharedQuantity
                                        )}
                                        {units[item.unit].symbol(
                                            item.sharedQuantity
                                        )}
                                    </>
                                ) : (
                                    <span className=" has-text-danger is-italic">
                                        non public
                                    </span>
                                )}
                            </ListCol>
                        </ListItem>
                    ))}
                </List>

                {isAdding ? (
                    <AddNewVariety
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
                        data && Math.ceil(data.getStock.count / variables.limit)
                    }
                    onPageChange={page => refetch({ page })}
                    isLoading={loading}
                />
            </div>
        </>
    );
};

export default StockSettings;
