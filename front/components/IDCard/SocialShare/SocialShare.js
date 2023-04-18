import PropTypes from 'prop-types';
import c from 'classnames';

import { FacebookShareButton, FacebookIcon } from 'react-share';

const medias = [{ key: 0, button: FacebookShareButton, icon: FacebookIcon }];

const SocialShare = ({ url, columns, column }) => {
    return (
        <div className={c('columns', columns)}>
            {medias.map(media => (
                <div key={media.key} className={c('column', column)}>
                    <media.button size={32} url={url}>
                        <media.icon size={32} round="true" />
                        Partage
                    </media.button>
                </div>
            ))}
        </div>
    );
};

SocialShare.propTypes = {
    url: PropTypes.objectOf(Object).isRequired,
    columns: PropTypes.string,
    column: PropTypes.string,
};

SocialShare.defaultProps = {
    columns: '',
    column: '',
};

export default SocialShare;
