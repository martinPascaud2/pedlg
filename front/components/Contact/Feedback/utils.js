import commentQuestionOutline from '@iconify/icons-mdi/comment-question-outline';
import lightbulbOnOutline from '@iconify/icons-mdi/lightbulb-on-outline';
import handPointingRight from '@iconify/icons-mdi/hand-pointing-right';
import bugOutline from '@iconify/icons-mdi/bug-outline';

export const handleCustomPosition = (position, formStyles, popup) => {
    let customFormStyles;
    if (position === 'left') {
        customFormStyles = { ...formStyles, left: '5%' };
    } else {
        customFormStyles = { ...formStyles, right: '5%' };
    }

    if (!popup) {
        customFormStyles = {
            ...customFormStyles,
            bottom: 'initial',
            position: 'initial',
            maxWidth: 'none',
        };
    }
    return customFormStyles;
};

export const defaultSubject = [
    {
        label: 'Question',
        icon: commentQuestionOutline,
        placeholder: 'Comment puis je faire pour ...',
    },
    {
        label: 'Problème',
        icon: bugOutline,
        placeholder: "J'ai eu une erreur sur la page ...",
    },
    {
        label: 'Suggestion',
        icon: lightbulbOnOutline,
        placeholder: 'Je vous suggére de ...',
    },
    {
        label: 'Autres',
        icon: handPointingRight,
        placeholder: 'Serait il possible de ...',
    },
];

export const defaultPaddingStyle = {
    padding: 0,
};

export const defaultButtonStyle = {
    zIndex: 5000,
    position: 'fixed',
    borderRadius: '4px 4px 0px 0px',
    bottom: 0,
};

export const defaultFormStyle = {
    ...defaultButtonStyle,
    maxWidth: '350px',
};

export const defaultValues = {
    message: null,
    subject: null,
    email: null,
    rating: -1,
};
