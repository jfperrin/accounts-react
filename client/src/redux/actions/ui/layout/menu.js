export const CURRENT_MENU = '@ui/layout/menu/CURRENT_MENU';

export function updateCurrentMenu(currentMenu) {
  return {
    type: CURRENT_MENU,
    currentMenu,
  };
}
