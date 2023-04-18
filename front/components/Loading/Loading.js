import PropTypes from 'prop-types';

import { useLottie, Lottie } from 'react-lottie-hook';
import animationData from '../../public/assets/images/animations/loading.json';

const Loading = ({ title, buttonText, onClick }) => {
    const [lottieRef] = useLottie({
        renderer: 'svg',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: false,
        },
        animationData,
    });
    return (
        <section className="hero is-lightgrey is-fullheight">
            <div className="container">
                <div className="hero-body is-centered-content">
                    <div className="columns">
                        <div className="has-text-centered has-margin-bottom-8">
                            <div>
                                <Lottie
                                    lottieRef={lottieRef}
                                    width={600}
                                    height={600}
                                    style={{ color: 'white' }}
                                />
                            </div>
                            <div className="has-text-centered has-margin-bottom-8">
                                <h1 className="subtitle is-3 is-primary is-italic">
                                    {title}
                                </h1>
                            </div>
                            <div className="has-text-centered">
                                <button
                                    type="button"
                                    onClick={onClick}
                                    className="button is-rounded is-small"
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

Loading.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
};

Loading.defaultProps = {
    buttonText: "Retour page d'accueil",
    title: 'Chargement...',
    onClick: () => {},
};

export default Loading;
