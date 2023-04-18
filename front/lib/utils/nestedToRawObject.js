/* eslint no-param-reassign: 0 */

const nestedToRawObject = (variables, obj = {}) => {
    if (variables) {
        Object.keys(variables).forEach(prop => {
            if (
                typeof variables[prop] === 'object' &&
                !Array.isArray(variables[prop])
            ) {
                nestedToRawObject(variables[prop], obj);
            } else {
                obj = Object.assign(obj, { [prop]: variables[prop] });
            }
        });
    }
    return obj;
};

export default nestedToRawObject;
