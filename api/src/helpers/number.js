const LIMIT = 50;

const isNumber = (n) => {
    if (n < 0 || !Number.isInteger(n)) return false;
    return true;
};

const inRange = (n, min = 0, max = LIMIT) => {
    if (!isNumber(n)) return false;
    return (n - min) * (n - max) <= 0;
};

module.exports = {
    inRange,
    isNumber,
};
