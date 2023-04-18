import { useSelector } from 'react-redux';
import { useState } from 'react';

import PropTypes from 'prop-types';
import c from 'classnames';

import InputWrapper from 'components/Form/InputWrapper';

import { Input, TextArea } from 'components/Form';
import { rules } from 'lib/rules';

import emoticonAngryOutline from '@iconify/icons-mdi/emoticon-angry-outline';
import emoticonSadOutline from '@iconify/icons-mdi/emoticon-sad-outline';
import emoticonNeutralOutline from '@iconify/icons-mdi/emoticon-neutral-outline';
import emoticonHappyOutline from '@iconify/icons-mdi/emoticon-happy-outline';
import emoticonExcitedOutline from '@iconify/icons-mdi/emoticon-excited-outline';

import { Icon } from '@iconify/react';

const Ico = ({ icon, width, color, onClick }) => (
    <div
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={0}
        className="column is-clickable"
    >
        <Icon icon={icon} color={color} width={width} />
    </div>
);

Ico.propTypes = {
    icon: PropTypes.objectOf(Object).isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    width: PropTypes.string,
};

Ico.defaultProps = {
    width: '40',
    color: '#3333',
};

const color = [
    '#D3D3D3',
    '#FF0000',
    '#FF8C00',
    '#FFC964',
    '#008000',
    '#7569ff',
];

const Body = ({
    showSelectSubject,
    showMessageInput,
    showRatingInput,
    showEmailInput,
    subjects,
    register,
    errors,
    style,
}) => {
    const [placeholder, handlePlaceholder] = useState(subjects[0].placeholder);
    const [subject, setSubject] = useState(subjects[0].label);
    const { loggedIn } = useSelector(state => state.auth);
    const [rated, setRate] = useState(0);

    const onClick = item => {
        handlePlaceholder(item.placeholder);
        setSubject(item.label);
    };

    return (
        <div style={style.body}>
            {showEmailInput && !loggedIn && (
                <Input
                    placeholder="Une adresse e-mail valide"
                    label="Adresse e-mail"
                    id="pedlg__signup-1"
                    name="email"
                    type="text"
                    error={errors && errors.email}
                    register={register({
                        maxLength: rules.email.maxLength(254),
                        pattern: rules.email.isValid(),
                        required: rules.required,
                    })}
                />
            )}
            {showSelectSubject && (
                <div className="field " style={style.message}>
                    <p className="label">Choisissez un sujet</p>
                    <div className="columns is-mobile is-multiline ">
                        {subjects.map(item => {
                            const isActive = item.label === subject;

                            return (
                                <div key={item.label} className="column">
                                    <button
                                        className={c('button is-fullwidth', {
                                            'is-primary': isActive,
                                        })}
                                        onClick={() => onClick(item)}
                                        type="button"
                                    >
                                        <span className="icon is-3">
                                            <Icon icon={item.icon} />
                                        </span>
                                        <p>{item.label}</p>
                                    </button>
                                </div>
                            );
                        })}
                        <textarea
                            ref={register()}
                            className="is-hidden"
                            value={subject}
                            name="subject"
                            id="subject"
                            disabled
                        />
                    </div>
                </div>
            )}
            {showMessageInput && (
                <TextArea
                    register={register({
                        validate: rules.description.len([16, 512]),
                        required: rules.required,
                    })}
                    label="Que souhaitez vous nous dire ?"
                    id="pedlg__settings-description-0"
                    error={errors && errors.message}
                    placeholder={placeholder}
                    name="message"
                />
            )}
            {showRatingInput && (
                <InputWrapper
                    label="Que pensez-vous de notre site web ?"
                    error={errors.rating}
                    id="rating"
                >
                    <div style={style.message}>
                        <div
                            className="columns is-mobile"
                            style={{ marginTop: '0.5rem', maxWidth: '200px' }}
                        >
                            <Ico
                                icon={emoticonAngryOutline}
                                color={rated === 1 ? color[rated] : color[0]}
                                onClick={() => setRate(1)}
                            />
                            <Ico
                                icon={emoticonSadOutline}
                                color={rated === 2 ? color[rated] : color[0]}
                                onClick={() => setRate(2)}
                            />
                            <Ico
                                icon={emoticonNeutralOutline}
                                color={rated === 3 ? color[rated] : color[0]}
                                onClick={() => setRate(3)}
                            />
                            <Ico
                                icon={emoticonHappyOutline}
                                color={rated === 4 ? color[rated] : color[0]}
                                onClick={() => setRate(4)}
                            />
                            <Ico
                                icon={emoticonExcitedOutline}
                                color={rated === 5 ? color[rated] : color[0]}
                                onClick={() => setRate(5)}
                            />
                        </div>
                    </div>
                    <textarea
                        className="is-hidden"
                        name="rating"
                        id="rating"
                        ref={register()}
                        value={rated}
                        disabled
                    />
                </InputWrapper>
            )}
        </div>
    );
};

Body.propTypes = {
    errors: PropTypes.objectOf(Object).isRequired,
    style: PropTypes.objectOf(Object).isRequired,

    register: PropTypes.func.isRequired,

    showSelectSubject: PropTypes.bool,
    showMessageInput: PropTypes.bool,
    showRatingInput: PropTypes.bool,
    showEmailInput: PropTypes.bool,

    subjects: PropTypes.arrayOf(
        PropTypes.exact({
            icon: PropTypes.objectOf(Object).isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
        })
    ).isRequired,
};

Body.defaultProps = {
    showSelectSubject: true,
    showMessageInput: true,
    showRatingInput: true,
    showEmailInput: true,
};

export default Body;
