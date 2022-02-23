export const HIDE_CREATE_CRUD_FORM = '@ui/user/updateForm/HIDE_CREATE_CRUD_FORM';

export function hideCreateForm(entity) {
  return {
    type: HIDE_CREATE_CRUD_FORM,
    entity,
  };
}

export const SHOW_CREATE_CRUD_FORM = '@ui/user/updateForm/SHOW_CREATE_CRUD_FORM';

export function showCreateForm(entity) {
  return {
    type: SHOW_CREATE_CRUD_FORM,
    entity,
  };
}
