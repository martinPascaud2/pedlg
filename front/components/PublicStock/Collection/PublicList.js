import PropTypes from 'prop-types';

import { formattedQuantity, units } from 'lib/utils/formattedQuantity';

import { List, ListItem, ListCol } from 'components/List';

import hand from '@iconify/icons-mdi/hand-heart';
import seed from '@iconify/icons-mdi/seed';
import corn from '@iconify/icons-mdi/corn';
import chatIcon from '@iconify/icons-mdi/chat';

const PublicList = ({ loading, list, userData, setPreview }) => {
    /* à rajouter
    const onSeedUrlClick = (item) => {
        router.push(
            `/seed/${item.varieties.id}`,
            `/variete/${item.varieties.id}`
        );
    } */
    return (
        <List loading={loading} emptyText="Liste vide">
            {list.map(item => (
                <ListItem
                    key={item.id}
                    className="is-clickable"
                    setPreview={setPreview}
                    icon={item.varieties.icon}
                >
                    <ListCol
                        cols={item?.unit ? 3 : 5}
                        icon={corn}
                        hRef={`seed/${item.varieties.id}`}
                    >
                        <span>{item.varieties.family}</span>
                    </ListCol>
                    <ListCol
                        cols={5}
                        icon={seed}
                        hRef={`seed/${item.varieties.id}`}
                    >
                        <span>{item.varieties.name}</span>
                    </ListCol>

                    {item.unit && (
                        <ListCol
                            cols={3}
                            icon={hand}
                            hRef={`seed/${item.varieties.id}`}
                        >
                            <>
                                {formattedQuantity(
                                    item.unit,
                                    item.sharedQuantity
                                )}
                                {units[item.unit].symbol(item.sharedQuantity)}
                            </>
                        </ListCol>
                    )}
                    <ListCol
                        cols={1}
                        icon={chatIcon}
                        hRef={`chat/messages?id=${userData.id}&username=${userData.username}&varName=${item.varieties.name}&hashId=${userData.hashId}`}
                        mustCo="true"
                    />
                </ListItem>
            ))}
        </List>
    );
};

PublicList.propTypes = {
    loading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(Object),
    userData: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        hashId: PropTypes.string,
    }).isRequired,
    setPreview: PropTypes.func,
};

PublicList.defaultProps = {
    list: [],
    setPreview: null,
};

export default PublicList;
