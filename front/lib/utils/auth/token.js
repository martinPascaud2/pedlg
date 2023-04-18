import decode from 'jwt-decode';
import fetch from 'isomorphic-unfetch';

const inMemoryToken = { token: null, expiry: 0 };

const getInMemoryToken = () => ({ ...inMemoryToken });

const setInMemoryToken = token => {
    try {
        const { exp } = decode(token);
        inMemoryToken.token = token;
        inMemoryToken.expiry = exp;

        return { ...inMemoryToken };
    } catch {
        inMemoryToken.token = null;
        inMemoryToken.expiry = 0;

        return null;
    }
};

const unsetInMemoryToken = () => setInMemoryToken(null);

const refreshToken = async (cookie = null) => {
    const { API_URL } = process.env;

    const response = await fetch(`${API_URL}/api`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(cookie ? { cookie: `refreshToken=${cookie}` } : {}),
        },
        body: JSON.stringify({
            query: '{ token: refreshToken }',
        }),
    });

    const { data, errors } = await response.json();

    if (!errors && data.token) {
        return data.token;
    }

    return null;
};

export { getInMemoryToken, setInMemoryToken, unsetInMemoryToken, refreshToken };
