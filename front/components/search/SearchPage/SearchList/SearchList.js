import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { List, ListItem, ListCol } from 'components/List';
import { useModal } from 'hooks';

import UpdateStockItem from 'components/settings/StockSettings/UpdateStockItem';
import InsertWantItem from 'components/settings/WishlistSettings/InsertWantItem';
import EmptySearch from 'components/search/SearchPage/SearchList/EmptySearch';
import LoginModal from 'components/auth/LoginModal';

import unlisted from '@iconify/icons-mdi/playlist-remove';
import listed from '@iconify/icons-mdi/playlist-check';
import sprout from '@iconify/icons-mdi/sprout';
import seed from '@iconify/icons-mdi/seed';
import gift from '@iconify/icons-mdi/gift';

const formattedAvailable = available => {
    return available ? listed : unlisted;
};

const SearchList = ({ loading, list, refetch }) => {
    const { loggedIn } = useSelector(state => state.auth);
    const { openModal } = useModal();

    const router = useRouter();

    const listActions = item => [
        {
            text: "J'en propose",
            icon: seed,
            onClick: () => {
                if (loggedIn) {
                    openModal(
                        <UpdateStockItem
                            item={{
                                variety: { ...item },
                                unit: 'gram',
                            }}
                            onUpdate={refetch}
                            title="Insertion"
                        />,
                        'is-small'
                    );
                } else {
                    openModal(<LoginModal />);
                }
            },
        },
        {
            text: "J'en cherche",
            icon: gift,
            color: 'is-primary is-outlined',
            onClick: () => {
                if (loggedIn) {
                    openModal(
                        <InsertWantItem
                            item={{
                                variety: { ...item },
                            }}
                            title="Insertion"
                        />,
                        'is-small'
                    );
                } else {
                    openModal(<LoginModal />);
                }
            },
        },
        {
            text: 'Détails',
            icon: sprout,
            onClick: () => {
                router.push(`/seed/${item.id}`, `/variete/${item.id}`);
            },
        },
    ];

    return (
        <List loading={loading} defaultView="card" emptyItem={<EmptySearch />}>
            {list.map(item => (
                <ListItem key={item.id} actions={listActions(item)}>
                    <ListCol cols={9} icon={seed}>
                        <span className="has-text-weight-bold">
                            {`${item.family}, ${item.name}`}
                        </span>
                    </ListCol>

                    <ListCol cols={3} icon={formattedAvailable(item.available)}>
                        <span>
                            {(available => {
                                if (available) {
                                    return `${available} proposition${
                                        available > 1 ? 's' : ''
                                    }`;
                                }
                                return 'Indisponible';
                            })(item.available)}
                        </span>
                    </ListCol>
                </ListItem>
            ))}
        </List>
    );
};

SearchList.propTypes = {
    loading: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(Object),
};

SearchList.defaultProps = {
    list: [],
};

export default SearchList;
