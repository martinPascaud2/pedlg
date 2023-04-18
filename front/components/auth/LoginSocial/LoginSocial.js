import { useState } from 'react';
import c from 'classnames';

import FacebookSVG from 'assets/images/facebook.svg';
import GoogleSVG from 'assets/images/google.svg';

const LoginSocial = () => {
    const [loading, setLoading] = useState(false);

    const login = provider => {
        setLoading(true);
        const url = `${process.env.API_URL}/auth/${provider}`;
        window.open(url);
        window.close();
    };

    return (
        <div className="has-content-vcentered">
            <div className="buttons is-centered">
                <button
                    type="button"
                    className={c('button', 'is-rounded', 'is-fullwidth', {
                        'is-loading': loading,
                    })}
                    onClick={() => login('facebook')}
                    disabled={loading}
                >
                    {!loading && (
                        <span className="icon">
                            <FacebookSVG
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                        </span>
                    )}
                    <span>Facebook</span>
                </button>
            </div>

            <div className="buttons is-centered">
                <button
                    type="button"
                    className={c('button', 'is-rounded', 'is-fullwidth', {
                        'is-loading': loading,
                    })}
                    onClick={() => login('google')}
                    disabled={loading}
                >
                    {!loading && (
                        <span className="icon">
                            <GoogleSVG
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                        </span>
                    )}
                    <span>Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginSocial;
