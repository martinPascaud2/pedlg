import getMessage from './messages';

const rules = {
    required: getMessage('REQUIRED'),
    sameAs: ([input, label], watcher) => value =>
        value === watcher(input) || getMessage('FIELD_CONFIRMATION', label),

    username: {
        isValid: () => ({
            value: /^[a-z0-9_-]+$/,
            message: getMessage('USERNAME_FORMAT'),
        }),

        len: ([min, max]) => value =>
            (value.length >= min && value.length <= max) ||
            getMessage('USERNAME_LEN', [min, max]),
    },

    email: {
        isValid: () => ({
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: getMessage('MAIL_FORMAT'),
        }),
        maxLength: value => ({
            value,
            message: getMessage('MAIL_MAX', value),
        }),
    },

    password: {
        isValid: value => {
            const constraints = {
                hasMinLen: value.length >= 8,
                hasUppercase: /([A-Z]+)/.test(value),
                hasLowercase: /([a-z]+)/.test(value),
                hasNumber: /([0-9]+)/.test(value),
            };

            return (
                Object.values(constraints).every(item => item) ||
                getMessage('PASSWORD_FORMAT', constraints)
            );
        },
    },

    description: {
        len: ([min, max]) => value =>
            (value.length >= min && value.length <= max) ||
            getMessage('DESCRIPTION_LEN', [min, max]),
    },

    stock: {
        min: value => ({
            value,
            message: getMessage('STOCK_QUANTITY_MIN', value),
        }),
        unit: value =>
            [
                'number',
                'gram',
                'packet',
                'stolon',
                'bulb',
                'plant',
                'cutting',
            ].indexOf(value) !== -1 || getMessage('STOCK_QUANTITY_UNIT'),
    },
};

export { rules, getMessage };
