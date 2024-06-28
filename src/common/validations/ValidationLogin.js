/** @format */

import isEmpty from 'lodash/isEmpty';
import ValidationMessages from '../helpers/ValidationMessages';

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export const validateLogin = (data) => {
  const errors = {};

  if (isBlank(data.username)) {
    errors.username = ValidationMessages.username.required;
  } else if (data.username.length !== 10) {
    errors.username = ValidationMessages.username.invalid;
  }
  // if (Validator.isEmpty(data.password)) {
  //   errors.password = ValidationMessages.password.required;
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
