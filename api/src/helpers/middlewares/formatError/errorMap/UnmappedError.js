const UnmappedError = (originalError) => {
    const { errors } = originalError;
    if (errors && errors[0]) {
        const {
            path, message, type, validatorArgs,
        } = errors[0];

        return [{
            path,
            message,
            type,
            validatorArgs,
        }];
    }

    return [originalError];
};

module.exports = UnmappedError;
