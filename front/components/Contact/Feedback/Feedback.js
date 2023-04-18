// TODO: reset field after onSubmit

import { useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import Button from './Button';
import Form from './Form';

import {
    handleCustomPosition,
    defaultPaddingStyle,
    defaultButtonStyle,
    defaultFormStyle,
    defaultSubject,
    defaultValues,
} from './utils';

const Feedback = ({
    showSelectSubject,
    showMessageInput,
    showButtonInput,
    showRatingInput,
    showEmailInput,
    headerText,
    buttonText,
    subjects,
    position,
    onSubmit,
    loading,
    popup,
    style,
}) => {
    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onChange',
        defaultValues,
    });

    const [showFeedback, handleFeedback] = useState(!popup);

    const handleButtonClick = () => {
        if (popup) handleFeedback(!showFeedback);
    };

    const submit = async formData => {
        await onSubmit(formData);
        reset();
        handleButtonClick();
    };

    const { form, button } = style;

    return (
        <>
            {showFeedback && (
                <Form
                    formPosition={handleCustomPosition(position, form, popup)}
                    showSelectSubject={showSelectSubject}
                    showMessageInput={showMessageInput}
                    showRatingInput={showRatingInput}
                    showEmailInput={showEmailInput}
                    handleClose={handleButtonClick}
                    handleSubmit={handleSubmit}
                    headerText={headerText}
                    onSubmit={submit}
                    position={position}
                    subjects={subjects}
                    register={register}
                    loading={loading}
                    errors={errors}
                    style={style}
                    popup={popup}
                />
            )}
            {!showFeedback && showButtonInput && (
                <Button
                    buttonPosition={handleCustomPosition(
                        position,
                        button,
                        popup
                    )}
                    handleButtonClick={handleButtonClick}
                    text={buttonText}
                />
            )}
        </>
    );
};

Feedback.propTypes = {
    subjects: PropTypes.arrayOf(
        PropTypes.exact({
            icon: PropTypes.objectOf(Object).isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
        })
    ),

    style: PropTypes.shape({
        message: PropTypes.objectOf(Object),
        button: PropTypes.objectOf(Object),
        footer: PropTypes.objectOf(Object),
        header: PropTypes.objectOf(Object),
        body: PropTypes.objectOf(Object),
        form: PropTypes.objectOf(Object),
    }),

    showSelectSubject: PropTypes.bool,
    showMessageInput: PropTypes.bool,
    showRatingInput: PropTypes.bool,
    showButtonInput: PropTypes.bool,
    showEmailInput: PropTypes.bool,
    buttonText: PropTypes.string,
    headerText: PropTypes.string,
    position: PropTypes.string,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
    popup: PropTypes.bool,
};
Feedback.defaultProps = {
    style: {
        footer: defaultPaddingStyle,
        header: defaultPaddingStyle,
        button: defaultButtonStyle,
        form: defaultFormStyle,
        message: {},
        body: {},
    },

    subjects: defaultSubject,
    headerText: 'Feedback',
    buttonText: 'Aide',
    position: 'right',
    loading: false,
    popup: false,

    showSelectSubject: true,
    showMessageInput: true,
    showButtonInput: true,
    showRatingInput: true,
    showEmailInput: true,

    onSubmit: () => {},
};

export default Feedback;
