import PropTypes from 'prop-types';

const Error = ({ title, subtitle, buttonText, onClick }) => {
    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1">{title}</h1>
                    <h2 className="subtitle is-italic has-padding-top-7">
                        {subtitle}
                    </h2>
                    <button
                        type="button"
                        onClick={onClick}
                        className="button is-rounded is-small"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};

Error.propTypes = {
    subtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
};

Error.defaultProps = {
    buttonText: "Retour page d'accueil",
    title: 'Oups ! Erreur 404',
    onClick: () => {},
};

export default Error;
