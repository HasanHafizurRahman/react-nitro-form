export const required = value => (value ? undefined : 'Required');

export const minLength = min => value => 
  value.length >= min ? undefined : `Must be at least ${min} characters`;
