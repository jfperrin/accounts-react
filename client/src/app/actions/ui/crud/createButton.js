export const HIDE_CREATE_CRUD_BUTTON = '@ui/user/updateForm/HIDE_CREATE_CRUD_BUTTON';

export function hideCreateButton(entity) {
  return {
    type: HIDE_CREATE_CRUD_BUTTON,
    entity,
  };
}

export const SHOW_CREATE_CRUD_BUTTON = '@ui/user/updateForm/SHOW_CREATE_CRUD_BUTTON';

export function showCreateButton(entity) {
  return {
    type: SHOW_CREATE_CRUD_BUTTON,
    entity,
  };
}
