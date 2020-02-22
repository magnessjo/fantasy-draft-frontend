export const validateString = (str: string) =>
  str.length > 0 && /^[a-zA-Z]+$/.test(str);

export const validateEmail = (str: string) => str.length > 0;
export const validatePassword = (str: string) => str.length > 0;

export const validate = (type: string, value: string) => {
  if (type === 'text') return validateString(value);
  if (type === 'password') return validatePassword(value);
  if (type === 'email') return validateEmail(value);

  return null;
};
