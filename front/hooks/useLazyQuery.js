import { useRef, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

const useLazyQuery = (query, options) => {
    const [skip, setSkip] = useState(true);
    const called = useRef(false);
    const success = useRef(false);
    const failure = useRef(false);
    const variables = useRef(options.variables);
    const data = useRef();

    const execute = vars => {
        if (vars) {
            variables.current = vars;
        }

        success.current = false;
        failure.current = false;
        called.current = true;
        setSkip(false);
    };

    const result = useQuery(query, {
        ...options,
        skip,
        variables: variables.current,
        onCompleted: response => {
            setSkip(true);
            success.current = true;

            return options.onCompleted && options.onCompleted(response);
        },
        onError: response => {
            setSkip(true);
            failure.current = true;

            return options.onError && options.onError(response);
        },
    });

    if (result.data) {
        data.current = result.data;
    }

    return [
        execute,
        {
            ...result,
            data: data.current,
            called: called.current,
            success: success.current,
            failure: failure.current,
        },
    ];
};

export default useLazyQuery;
