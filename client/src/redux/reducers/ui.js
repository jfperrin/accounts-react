import { HIDE_CREATE_CRUD_BUTTON, SHOW_CREATE_CRUD_BUTTON } from '../actions/ui/crud/createButton';
import { HIDE_EDIT_CRUD_FORM, SHOW_EDIT_CRUD_FORM } from '../actions/ui/crud/updateForm';
import { HIDE_CREATE_CRUD_FORM, SHOW_CREATE_CRUD_FORM } from '../actions/ui/crud/createForm';
import { UPDATE_LAYOUT_TITLE } from '../actions/ui/layout/title';
import { MODALE_OPENED, MODALE_ENTITY } from '../actions/ui/layout/modale';
import { CURRENT_MENU } from '../actions/ui/layout/menu';
import { UPDATE_LOGIN_ERRORS } from '../actions/ui/login/errors';

function getInitialState() {
  return {
    drawerOpened: false,
    banksEditState: [],
    banksCreateButtonState: true,
    banksCreateFormState: false,
    crudEditState: [],
    crudCreateButtonState: [],
    crudCreateFormState: [],
    layoutTitle: '',
    loginErrors: [],
    currentMenu: '0',
  };
}

export default function ui(state = getInitialState(), action) {
  switch (action.type) {
    case MODALE_OPENED: {
      return { ...state, modaleOpened: action.modaleOpened };
    }
    case MODALE_ENTITY: {
      if (action.modaleEntity) {
        return { ...state, modaleEntity: action.modaleEntity };
      }

      const newState = { ...state };
      delete newState.modaleEntity;
      return newState;
    }
    case CURRENT_MENU: {
      return { ...state, currentMenu: action.currentMenu };
    }
    case UPDATE_LOGIN_ERRORS: {
      return { ...state, loginErrors: action.errors };
    }
    case UPDATE_LAYOUT_TITLE: {
      return { ...state, layoutTitle: action.title };
    }
    case SHOW_EDIT_CRUD_FORM: {
      return { ...state, crudEditState: state.crudEditState.setIn([action.entity, action.id], true) };
    }
    case HIDE_EDIT_CRUD_FORM: {
      return { ...state, crudEditState: state.crudEditState.setIn([action.entity, action.id], false) };
    }
    case SHOW_CREATE_CRUD_BUTTON: {
      return { ...state, crudCreateButtonState: state.crudCreateButtonState.set(action.entity, true) };
    }
    case HIDE_CREATE_CRUD_BUTTON: {
      return { ...state, crudCreateButtonState: state.crudCreateButtonState.set(action.entity, false) };
    }
    case SHOW_CREATE_CRUD_FORM: {
      return { ...state, crudCreateFormState: state.crudCreateFormState.set(action.entity, true) };
    }
    case HIDE_CREATE_CRUD_FORM: {
      return { ...state, crudCreateFormState: state.crudCreateFormState.set(action.entity, false) };
    }
    default:
      return state;
  }
}
