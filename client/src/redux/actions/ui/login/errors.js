export const UPDATE_LOGIN_ERRORS = '@ui/layout/title/UPDATE_LOGIN_ERRORS';

export function updateLoginErrors(errors) {
  return {
    type: UPDATE_LOGIN_ERRORS,
    errors,
  };
}
