import { useSelector } from 'react-redux';

import { isAuth } from 'lib/utils/auth';

import SettingsPage from 'components/settings/SettingsPage';
import AccountSettings from 'components/settings/AccountSettings';

const AccountSettingsPage = () => {
    const { currentUser } = useSelector(state => state.auth);
    const {
        id,
        hashId,
        username,
        email,
        createdAt,
        provider,
        register,
        userMetadata,
    } = currentUser;
    return (
        <SettingsPage title="Compte">
            <AccountSettings
                id={id}
                hashId={hashId}
                username={username}
                email={email}
                provider={provider}
                register={register}
                createdAt={createdAt}
                avatar={userMetadata.avatar}
                department={userMetadata.department}
                description={userMetadata.description}
            />
        </SettingsPage>
    );
};

export default isAuth(AccountSettingsPage);
