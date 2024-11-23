export const required = (value, fieldName = 'This field') =>
  value ? undefined : `${fieldName} is required`;

export const minLength = (min) => (value, fieldName = 'This field') =>
  value.length >= min
    ? undefined
    : `${fieldName} must be at least ${min} characters long`;

export const maxLength = (max) => (value, fieldName = 'This field') =>
  value.length <= max
    ? undefined
    : `${fieldName} must not exceed ${max} characters`;

export const isEmail = (value, fieldName = 'Email') =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? undefined
    : `${fieldName} must be a valid email address`;

export const match = (matchField) => (value, values, fieldName = 'This field') =>
  value === values[matchField]
    ? undefined
    : `${fieldName} must match ${matchField}`;

export const customValidator = (callback, errorMessage) => (value, fieldName) =>
  callback(value) ? undefined : errorMessage || `${fieldName} is invalid`;

