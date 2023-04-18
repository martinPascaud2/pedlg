import { useSelector } from 'react-redux';

import { isAuth } from 'lib/utils/auth';

import SettingsPage from 'components/settings/SettingsPage';
import PasswordSettings from 'components/settings/PasswordSettings';

const SecuritySettingsPage = () => {
    const { currentUser } = useSelector(state => state.auth);

    return (
        <SettingsPage title="Sécurité">
            <PasswordSettings hasPassword={currentUser.hasPassword} />
        </SettingsPage>
    );
};

export default isAuth(SecuritySettingsPage);
