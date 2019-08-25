const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function ValidThreadInputs(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.userId = !isEmpty(data.userId) ? data.userId : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if(Validator.isEmpty(data.description)) {
        errors.description = 'description is required';
    }

    if(Validator.isEmpty(data.username)) {
        errors.username = 'username is required';
    }

    if(Validator.isEmpty(data.userId)) {
        errors.userId = 'userId is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
