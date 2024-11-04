// errorHelper.js
const errorModel = (code, message) => {
    const error = new Error(message);
    error.code = code;
    return error;
};

module.exports = errorModel;