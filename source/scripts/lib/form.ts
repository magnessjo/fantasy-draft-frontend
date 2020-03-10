const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegEx = /^.*?\W/;

export const validateString = (str: string) =>
  str.length > 0 && /^[a-zA-Z]+$/.test(str);

export const validateEmail = (str: string) =>
  str.length > 0 && emailRegEx.test(str);

export const validatePassword = (str: string) =>
  str.length > 8 && passwordRegEx.test(str);

export const validate = (type: string, value: string) => {
  if (type === 'text') return validateString(value);
  if (type === 'password') return validatePassword(value);
  if (type === 'email') return validateEmail(value);
  if (type === 'any') return value.length > 0;

  return null;
};
