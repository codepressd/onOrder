import isEmpty from 'lodash/isEmpty';
export default function validateLogin(data) {
    let errors = {};

    Object.keys(data).map(function(objectKey, index) {
        let value = data[objectKey];

        if (typeof value == 'string' && value.length < 1) {

            errors[objectKey] = 'This Field Is Required';

        }

    });
    return {
        errors,
        isValid: isEmpty(errors)
    }

}
