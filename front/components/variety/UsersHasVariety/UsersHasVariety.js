import PropTypes from 'prop-types';

import { useQuery } from '@apollo/react-hooks';

import { List, ListItem, ListCol } from 'components/List';
import c from 'classnames';

import { GET_USERS_WITH_VARIETY } from 'lib/gql/queries';

import personSquare from '@iconify/icons-bi/person-square';
import chatIcon from '@iconify/icons-mdi/chat';
import user from '@iconify/icons-mdi/user';

import css from 'styles/pages/seed/seedId.module.scss';

const share = 'partage';

const UsersHasVariety = ({ varietyId, varName }) => {
    const { loading, data } = useQuery(GET_USERS_WITH_VARIETY, {
        variables: {
            varietyId,
            list: 'Stock',
        },
    });
    return (
        <div className={c('card', css['id-card'])}>
            <h6 className="has-margin-left-3 has-margin-bottom-3">
                <p className="subtitle is-size-5">
                    Ils proposent cette variété
                </p>
            </h6>

            <List
                loading={loading}
                viewMode={false}
                emptyText="Pas encore de proposition"
                defaultView="list"
            >
                {data?.whohas_request &&
                    data.whohas_request.map(item => {
                        const lastLogin = new Date(
                            Number(item.lastLogin)
                        ).toLocaleDateString('fr-FR');
                        return (
                            <div key={item.id}>
                                <ListItem className="column has-margin-top-4 is-hidden-touch">
                                    <ListCol
                                        cols={3}
                                        icon={personSquare}
                                        hRef={`${share}/${item.hashId}`}
                                    >
                                        {`${item.username}`}
                                    </ListCol>
                                    <ListCol
                                        cols={5}
                                        hRef={`${share}/${item.hashId}`}
                                    >
                                        <span
                                            className={c(
                                                'is-italic is-size-7',
                                                {
                                                    'has-text-success':
                                                        item.online,
                                                    'has-text-danger': !item.online,
                                                }
                                            )}
                                        >
                                            {item.online
                                                ? 'Connecté'
                                                : `Connecté le ${lastLogin}`}
                                        </span>
                                    </ListCol>
                                    <ListCol
                                        cols={2}
                                        icon={chatIcon}
                                        hRef={`chat/messages?id=${item.id}&username=${item.username}&varName=${varName}&hashId=${item.hashId}`}
                                        mustCo="true"
                                    />
                                    <ListCol
                                        cols={1}
                                        icon={user}
                                        hRef={`${share}/${item.hashId}`}
                                    />
                                </ListItem>
                                <ListItem className="column has-margin-top-4 is-hidden-desktop is-mobile">
                                    <ListCol
                                        cols={9}
                                        icon={personSquare}
                                        hRef={`${share}/${item.hashId}`}
                                    >
                                        <div className="column">
                                            {`${item.username}`}
                                        </div>
                                        <div className="is-pulled-right">
                                            <span
                                                className={c(
                                                    'is-italic is-size-7',
                                                    {
                                                        'has-text-success':
                                                            item.online,
                                                        'has-text-danger': !item.online,
                                                    }
                                                )}
                                            >
                                                {item.online
                                                    ? 'Connecté'
                                                    : `Connecté le ${lastLogin}`}
                                            </span>
                                        </div>
                                    </ListCol>
                                    <ListCol
                                        cols={2}
                                        icon={chatIcon}
                                        hRef={`chat/messages?id=${item.id}&username=${item.username}&varName=${varName}&hashId=${item.hashId}`}
                                        mustCo="true"
                                    />
                                </ListItem>
                            </div>
                        );
                    })}
            </List>
        </div>
    );
};

UsersHasVariety.propTypes = {
    varietyId: PropTypes.number.isRequired,
    varName: PropTypes.string.isRequired,
};

export default UsersHasVariety;
