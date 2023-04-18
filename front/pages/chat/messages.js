import Layout from 'components/Layout';
import Header from 'components/search/SearchPage/Header';

import { useRouter } from 'next/router';
import { getInMemoryToken } from 'lib/utils/auth/token';
import Link from 'next/link';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useModal } from 'hooks';
import LoginModal from 'components/auth/LoginModal';

import {
    ChatItem,
    Avatar,
    SystemMessage,
    MessageBox,
} from 'react-chat-elements';

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { CREATE_MESSAGE } from 'lib/gql/mutations';
import {
    GET_ROOM_ID,
    GET_MESSAGES,
    GET_ALL_ROOM_BY_USER,
    GET_USER,
} from 'lib/gql/queries';
import MESSAGE_ADDED from 'lib/gql/subscriptions';

import c from 'classnames';
import css from 'styles/pages/chat/messages.module.scss';
import { Icon } from '@iconify/react';
import lineOutlined from '@iconify/icons-ant-design/line-outlined';
import returnUpBack from '@iconify/icons-mdi/keyboard-backspace';
import sendIcon from '@iconify/icons-mdi/send';

import * as timeago from 'timeago.js';

const locale = (number, index) => {
    return [
        ["A l'instant"],
        ["A l'instant"],
        ['Il y a 1 minute'],
        ['Il y a %s minutes'],
        ['Il y a 1 heure'],
        ['Il y a %s heures'],
        ['Il y a 1 jour'],
        ['Il y a %s jours'],
        ['Il y a 1 semaine'],
        ['Il y a %s semaines'],
        ['Il y a 1 mois'],
        ['Il y a %s mois'],
        ['Il y a 1 an'],
        ['Il y a %s ans'],
    ][index];
};

timeago.register('frDates', locale);

const Chat = () => {
    const { currentUser, loggedIn } = useSelector(state => state.auth);
    const { openModal } = useModal();

    const router = useRouter();
    const { id, username, varName, hashId } = router.query;
    const { token } = getInMemoryToken();

    const firstMessageAlert = `Vous entamez une toute nouvelle discussion avec ${username} !`;
    const [helloMessage, setHelloMessage] = useState(
        `Bonjour ${username}, je te contacte au sujet des graines de ${varName}, tu es disponible pour en parler ?`
    );

    const [roomId, setRoomId] = useState();
    const [mobileSelected, setMobileSelected] = useState('chatrooms');
    const [contactId, setContactId] = useState(parseInt(id, 10));
    const [newMessage, setNewMessage] = useState(
        username && varName ? helloMessage : ''
    );
    const [titleAvatar, setTitleAvatar] = useState();
    const [titleUsername, setTitleUsername] = useState();
    const [titleHashId, setTitleHashId] = useState();
    const inputRef = useRef(null);

    const { data: allRoomData, refetch: getRooms } = useQuery(
        GET_ALL_ROOM_BY_USER
    );

    const { data: userData } = useQuery(GET_USER, {
        skip: !hashId,
        variables: { hashId },
    });

    const { data: roomIdData, refetch: getRoomId } = useQuery(GET_ROOM_ID, {
        skip: !contactId,
        variables: { contactId },
    });

    useEffect(() => {
        if (roomIdData?.roomId) {
            setRoomId(roomIdData.roomId);
        }
        if (
            userData?.info?.userMetadata &&
            titleAvatar === undefined &&
            titleUsername === undefined
        ) {
            setTitleAvatar(
                `/assets/images/avatar/${userData.info.userMetadata.avatar}`
            );
            setTitleUsername(userData.info.username);
        }
    });

    const { data: messagesData, refetch: getMessages } = useQuery(
        GET_MESSAGES,
        {
            skip: !roomId,
            variables: { roomId },
        }
    );

    useSubscription(MESSAGE_ADDED, {
        onSubscriptionData: () => {
            if (contactId) getRoomId();
            if (roomIdData?.roomId && roomId) {
                getMessages({ variables: { roomId } });
                getRooms();
            }
        },
        variables: { token },
    });

    const [createMessage] = useMutation(CREATE_MESSAGE);

    const onChange = event => {
        setNewMessage(event.target.value.trim());
    };
    const onKeyPress = event => {
        setRoomId(roomIdData?.roomId == null ? undefined : roomIdData.roomId);
        if ((event.key === 'Enter' || event.type === 'click') && newMessage) {
            inputRef.current.value.trim();
            createMessage({
                variables: {
                    roomId,
                    receiverId: contactId,
                    message: newMessage,
                },
            });
            setNewMessage('');
            inputRef.current.value = '';
        }
        if (newMessage === '') {
            inputRef.current.value = '';
        }
    };

    const messageListDataSource =
        messagesData &&
        messagesData.messages.map(message => (
            <div className="columns" key={message.id}>
                <MessageBox
                    className={c(
                        currentUser.id === message.sender.id
                            ? 'column has-padding-left-7'
                            : 'column has-padding-right-7',
                        css[
                            currentUser.id === message.sender.id
                                ? 'myMessage'
                                : 'hisMessage'
                        ]
                    )}
                    position={
                        currentUser.id === message.sender.id ? 'right' : 'left'
                    }
                    type="text"
                    text={message.message}
                    dateString={timeago.format(message.createdAt, 'frDates')}
                />
            </div>
        ));

    const timestampConverter = room => {
        const dateString =
            room.unread === false
                ? timeago.format(room.viewDate, 'frDates')
                : timeago.format(room.contact.lastLogin, 'frDates');
        return dateString;
    };

    const inputElement = (
        <div className="columns is-vcentered is-gapless is-mobile">
            <div className="column is-9-tablet is-8-mobile has-margin-top-4 has-margin-left-6">
                <input
                    ref={inputRef}
                    defaultValue={varName && helloMessage}
                    className="input"
                    name="submit-chat"
                    type="text"
                    placeholder="Démarrer un nouveau message"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    maxLength={165}
                    autoComplete="off"
                />
            </div>
            <div className="column is-2 has-margin-top-4 has-margin-left-2">
                <button
                    type="button"
                    className="button is-primary is-inverted"
                    onClick={onKeyPress}
                >
                    <Icon icon={sendIcon} width="25" height="25" />
                </button>
            </div>
        </div>
    );

    const chatList =
        allRoomData &&
        allRoomData.allRoom.map(room => {
            return (
                <div
                    className="columns is-vcentered is-mobile is-clickable has-margin-bottom-7"
                    key={room.id}
                >
                    <div className="column is-12 is-paddingless is-narrow">
                        <ChatItem
                            className={c(
                                'has-text-link has-text-weight-semibold',
                                css.chatItem
                            )}
                            avatar={`/assets/images/avatar/${room.contact.userMetadata.avatar}`}
                            alt={`chatroom ${room.id}`}
                            title={room.contact.username}
                            subtitle={room.message}
                            dateString={timestampConverter(room)}
                            unread={
                                room.unread &&
                                room.receiverId === currentUser.id
                            }
                            onClick={() => {
                                setContactId(room.contact.id);
                                setHelloMessage();
                                setTitleAvatar(
                                    `/assets/images/avatar/${room.contact.userMetadata.avatar}`
                                );
                                setTitleUsername(room.contact.username);
                                setTitleHashId(room.contact.hashId);
                                setNewMessage();
                                setMobileSelected('messages');
                                if (inputRef?.current?.value) {
                                    inputRef.current.value =
                                        contactId === room.contact.id
                                            ? inputRef.current.value
                                            : '';
                                }
                                if (inputRef?.current?.select) {
                                    inputRef.current.select();
                                }
                            }}
                            key={room.roomId}
                            statusColor={
                                room.contact.online
                                    ? 'hsl(145, 43%, 54%)'
                                    : 'hsl(350, 80%, 55%)'
                            }
                            statusColorType="badge"
                        />
                    </div>
                    {contactId === room.contact.id && (
                        <div className="column is-0 is-paddingless is-hidden-mobile">
                            <figure className="image is-32x32">
                                <Icon
                                    icon={lineOutlined}
                                    color="hsl(207, 71%, 55%)"
                                    rotate="90deg"
                                    height="30"
                                    width="30"
                                />
                            </figure>
                        </div>
                    )}
                </div>
            );
        });

    const title = (
        <div className={c('columns has-margin-right-0 is-mobile is-vcentered')}>
            <h6
                className={c(
                    'column is-4-tablet is-offset-0 has-padding-left-6',
                    mobileSelected === 'messages' ? 'is-hidden-mobile' : null
                )}
            >
                <p className="is-size-5 has-text-weight-semibold">Messagerie</p>
            </h6>
            <div
                className={c(
                    'column is-offset-0 has-padding-left-6',
                    mobileSelected === 'chatrooms'
                        ? 'is-hidden'
                        : 'is-hidden-tablet'
                )}
            >
                <button
                    type="button"
                    className="button is-link"
                    onClick={() => {
                        setMobileSelected('chatrooms');
                        window.scrollTo(0, 0);
                    }}
                >
                    Contacts
                </button>
            </div>
            {titleAvatar && titleUsername && titleHashId && (
                <div
                    className={c(
                        'column is-6 is-offset-1-tablet is-offset-2-mobile',
                        mobileSelected === 'chatrooms'
                            ? 'is-hidden-mobile'
                            : null
                    )}
                >
                    <div className="columns">
                        <div className="column is-offset-0 is-paddingless">
                            <div className="columns is-vcentered is-mobile">
                                <div className="column is-1 has-margin-right-2">
                                    <Avatar
                                        src={titleAvatar}
                                        alt="logo"
                                        size="large"
                                        type="circle flexible"
                                    />
                                </div>
                                <div className="column title is-size-5 has-text-link has-margin-left-6 is-offset-1-mobile">
                                    <Link href={`/partage/${titleHashId}`}>
                                        <a>{titleUsername}</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const hR = (
        <div className="columns is-centered">
            <div className="column is-10">
                <hr className={c('is-marginless', css.hR)} />
            </div>
        </div>
    );

    const defaultChatList = (
        <div className="has-text-grey-lighter has-text-centered">
            Vos discussions
        </div>
    );

    const defaultMessageList = (
        <div className="has-text-grey has-text-centered has-fullheight">
            Selectionner un membre pour démarrer une discussion
        </div>
    );

    const chatPlace = (
        <div className="columns is-centered">
            <div
                className={c(
                    'column is-4-tablet is-offset-0-tablet has-margin-top-3-tablet has-margin-left-4-tablet is-padding-right-8 has-padding-right-8',
                    mobileSelected === 'messages' ? 'is-hidden-mobile' : null
                )}
            >
                <div>
                    {chatList?.length && chatList.length > 0
                        ? chatList
                        : defaultChatList}
                </div>
            </div>
            <div className="is-divider-vertical is-hidden-mobile is-paddingless" />
            <div
                className={c(
                    'column is-7 is-offset-0',
                    mobileSelected === 'chatrooms' ? 'is-hidden-mobile' : null
                )}
            >
                <div className={css.messages}>
                    {messageListDataSource || defaultMessageList}
                </div>
                {messagesData === undefined && id && username && (
                    <SystemMessage text={firstMessageAlert} />
                )}
                {Number.isNaN(contactId) !== true && inputElement}
            </div>
        </div>
    );

    if ((id === currentUser.id || contactId === currentUser.id) && loggedIn) {
        return (
            <>
                <Layout title="sameNPC">
                    <div className="columns">
                        <div className="column is-8 is-offset-2 has-padding-8">
                            <Header
                                onClick={() => router.back()}
                                title="Retour"
                                icon={returnUpBack}
                            />
                            <div>
                                Vous ne pouvez pas vous envoyer de message à
                                vous-même !
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }

    const notCo = (
        <div className="columns">
            <div className="column is-8 is-offset-2 has-padding-8">
                <Header
                    onClick={() => router.back()}
                    title="Retour"
                    icon={returnUpBack}
                />
                <div>Connectez-vous et accédez à vos messages !</div>
                <button
                    type="button"
                    className="button is-primary"
                    onClick={() => openModal(<LoginModal />)}
                >
                    Se connecter
                </button>
            </div>
        </div>
    );

    return (
        <Layout title="chatPage">
            {loggedIn && (
                <div
                    className={c(
                        'container is-narrow has-margin-bottom-7',
                        css.container
                    )}
                >
                    <div className="columns is-centered">
                        <div className="column is-8 has-padding-top-8 has-padding-bottom-0">
                            <Header
                                onClick={() => router.back()}
                                title="Retour"
                                icon={returnUpBack}
                            />
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <div
                                className={c(
                                    'box has-padding-top-8 has-padding-right-0 has-padding-left-3',
                                    css.box
                                )}
                            >
                                {title}
                                {hR}
                                {chatPlace}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!loggedIn && notCo}
        </Layout>
    );
};

export default Chat;
