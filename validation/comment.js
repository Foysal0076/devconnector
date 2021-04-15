const Validator = require('validator')
const isEmpty = require('./is-empty')
module.exports = function validateCommentInput(data) {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : ''


    if (!Validator.isLength(data.text, { min: 2, max: 100 })) {
        errors.text = 'Post must be between 2 and 100 characters'
    }

    if (Validator.isEmpty(data.text)) {
        errors.email = 'Post field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}