export const getCrudEditState = ({ ui }, { entity, id }) => ui.crudEditState.getIn([entity, id]);
export const getLayoutTitle = ({ ui }) => ui.layoutTitle;
export const getLoginErrors = ({ ui }) => ui.loginErrors;
export const getSelectedMenu = ({ ui }) => ui.currentMenu;
export const getModaleOpened = ({ ui }) => ui.modaleOpened;
export const getModaleEntity = ({ ui }) => ui.modaleEntity;
