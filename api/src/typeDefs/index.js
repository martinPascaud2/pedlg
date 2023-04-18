const types = require('./types');
const query = require('./query');
const mutation = require('./mutation');
const enums = require('./enum');
const inputs = require('./inputs');
const subscription = require('./subscription');

module.exports = [...types, enums, inputs, query, mutation, subscription];
