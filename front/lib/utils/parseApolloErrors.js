const invalidFieldErrors = ['INVALID_FIELDS', 'UNIQUE_CONSTRAINT'];
// const internalServerErrors = [''];

const parser = ({ graphQLErrors, networkError } = {}) => {
    const inputErrors = [];
    const serverErrors = [];

    console.log({ graphQLErrors, networkError });

    if (graphQLErrors && graphQLErrors.length) {
        const { extensions } = graphQLErrors[0];

        if (invalidFieldErrors.indexOf(extensions.code) !== -1) {
            extensions.data.forEach(error => inputErrors.push(error));
        } else {
            extensions.data.forEach(error => serverErrors.push(error));
        }
    }

    if (networkError) {
        serverErrors.push(networkError);
    }

    console.log(inputErrors, serverErrors);

    return {
        inputErrors,
        serverErrors,
    };
};

export default parser;
