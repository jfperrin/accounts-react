export const getCrudCreateButtonState = (state, props) => state.ui.crudCreateButtonState.get(props.entity);
export const getCrudCreateFormState = (state, props) => state.ui.crudCreateFormState.get(props.entity);
export const getCrudEditState = (state, props) => state.ui.crudEditState.getIn([props.entity, props.id]);
export const getLayoutTitle = state => state.ui.layoutTitle;
export const getLoginErrors = state => state.ui.loginErrors;
export const getSelectedMenu = state => state.ui.currentMenu;
export const getModaleOpened = state => state.ui.modaleOpened;
export const getModaleEntity = state => state.ui.modaleEntity;
