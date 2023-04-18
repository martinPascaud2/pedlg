const msgToPath = (message) => {
    const splitMessage = message.split('_')[0];
    const lowerMessage = splitMessage.toLowerCase();
    return lowerMessage;
};

class ApiError extends Error {
    constructor(message = 'API_ERROR', params = {}) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super({ ...params });
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
        const { code, path, type } = params;
        this.type = type || 'ApiError';
        this.errors = [];
        this.errors.push({
            ...params,
            path: path || msgToPath(message),
            message,
            type: this.type,
            code,
        });
    }
}

module.exports = ApiError;
