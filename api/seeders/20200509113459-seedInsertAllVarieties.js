const generateSeed = require('../seed/generateSeed');

module.exports = {
    up: () => generateSeed().then(() => console.log(' Finished ')),
    down: () => {},
};
