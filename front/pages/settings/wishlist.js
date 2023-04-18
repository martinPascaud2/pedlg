import { isAuth } from 'lib/utils/auth';

import SettingsPage from 'components/settings/SettingsPage';
import WishlistSettings from 'components/settings/WishlistSettings';

const WishlistPage = () => (
    <SettingsPage title="Liste de souhaits">
        <WishlistSettings />
    </SettingsPage>
);

export default isAuth(WishlistPage);
