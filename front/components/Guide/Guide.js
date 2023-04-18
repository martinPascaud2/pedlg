import ReactPlayer from 'react-player/youtube';

import css from './Guide.module.scss';

const Guide = () => {
    return (
        <div className={css['player-wrapper']}>
            <ReactPlayer
                className={css['react-player']}
                url="https://www.youtube.com/embed/drx7dZ2fNbw"
                width="100%"
                height="100%"
                controls
            />
        </div>
    );
};

export default Guide;
