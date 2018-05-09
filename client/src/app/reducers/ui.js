import { Map } from 'immutable';

import {
  HIDE_CREATE_CRUD_BUTTON,
  SHOW_CREATE_CRUD_BUTTON,
} from '../actions/ui/crud/createButton';

import {
  HIDE_EDIT_CRUD_FORM,
  SHOW_EDIT_CRUD_FORM,
} from '../actions/ui/crud/updateForm';

import {
  HIDE_CREATE_CRUD_FORM,
  SHOW_CREATE_CRUD_FORM,
} from '../actions/ui/crud/createForm';

import {
  UPDATE_LAYOUT_TITLE,
} from '../actions/ui/layout/title';

import {
  UPDATE_LOGIN_ERRORS,
} from '../actions/ui/login/errors';

function getInitialState() {
  return {
    drawerOpened: false,
    banksEditState: new Map(),
    banksCreateButtonState: true,
    banksCreateFormState: false,
    crudEditState: new Map(),
    crudCreateButtonState: new Map(),
    crudCreateFormState: new Map(),
    layoutTitle: '',
    loginErrors: [],
  };
}

export default function ui(state = getInitialState(), action) {
  switch (action.type) {
    case UPDATE_LOGIN_ERRORS: {
      return Object.assign({}, state, { loginErrors: action.errors });
    }

    case UPDATE_LAYOUT_TITLE: {
      return Object.assign({}, state, { layoutTitle: action.title });
    }

    case SHOW_EDIT_CRUD_FORM: {
      return Object.assign({}, state, { crudEditState: state.crudEditState.setIn([ action.entity, action.id ], true) });
    }

    case HIDE_EDIT_CRUD_FORM: {
      return Object.assign({}, state, { crudEditState: state.crudEditState.setIn([ action.entity, action.id ], false) });
    }

    case SHOW_CREATE_CRUD_BUTTON: {
      return Object.assign({}, state, { crudCreateButtonState: state.crudCreateButtonState.set(action.entity, true) });
    }

    case HIDE_CREATE_CRUD_BUTTON: {
      return Object.assign({}, state, { crudCreateButtonState: state.crudCreateButtonState.set(action.entity, false) });
    }

    case SHOW_CREATE_CRUD_FORM: {
      return Object.assign({}, state, { crudCreateFormState: state.crudCreateFormState.set(action.entity, true) });
    }

    case HIDE_CREATE_CRUD_FORM: {
      return Object.assign({}, state, { crudCreateFormState: state.crudCreateFormState.set(action.entity, false) });
    }

    default:
      return state;
  }
}
