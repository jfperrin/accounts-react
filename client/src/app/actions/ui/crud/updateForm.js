import { getCrudEditState as getCrudEditStateSelector } from '../../../selectors/ui';

export const SHOW_EDIT_CRUD_FORM = '@ui/user/updateForm/SHOW_EDIT_CRUD_FORM';
export const HIDE_EDIT_CRUD_FORM = '@ui/user/updateForm/HIDE_EDIT_CRUD_FORM';

export function toggleEditForm(entity, id) {
  return (dispatch, getState) => {
    const value = !getCrudEditStateSelector(getState(), { entity, id });
    if (value) {
      dispatch({
        type: SHOW_EDIT_CRUD_FORM,
        id,
        entity,
      });
    } else {
      dispatch({
        type: HIDE_EDIT_CRUD_FORM,
        id,
        entity,
      });
    }
  };
};
