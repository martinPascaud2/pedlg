/* eslint react/prop-types: 0 */
import Header from './Header';
import Footer from './Footer';
import Body from './Body';

const Form = ({
    showSelectSubject,
    showMessageInput,
    showRatingInput,
    showEmailInput,
    handleSubmit,
    formPosition,
    messageInput,
    handleClose,
    handleInput,
    ratingInput,
    headerText,
    emailInput,
    validInput,
    register,
    bodyText,
    onSubmit,
    subjects,
    loading,
    errors,
    style,
    popup,
}) => {
    return (
        <div style={formPosition} className="box">
            <Header
                handleClose={handleClose}
                headerText={headerText}
                style={style.header}
                popup={popup}
            />
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Body
                    showSelectSubject={showSelectSubject}
                    showMessageInput={showMessageInput}
                    showRatingInput={showRatingInput}
                    showEmailInput={showEmailInput}
                    messageInput={messageInput}
                    handleInput={handleInput}
                    ratingInput={ratingInput}
                    validInput={validInput}
                    emailInput={emailInput}
                    subjects={subjects}
                    register={register}
                    bodyText={bodyText}
                    errors={errors}
                    style={style}
                />
                <hr />
                <Footer
                    handleClose={handleClose}
                    style={style.footer}
                    loading={loading}
                    errors={errors}
                    popup={popup}
                />
            </form>
        </div>
    );
};

export default Form;
