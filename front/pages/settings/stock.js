import { isAuth } from 'lib/utils/auth';

import SettingsPage from 'components/settings/SettingsPage';
import StockSettings from 'components/settings/StockSettings';

const StockSettingsPage = () => (
    <SettingsPage title="Inventaire">
        <StockSettings />
    </SettingsPage>
);

export default isAuth(StockSettingsPage);
