export const UPDATE_LAYOUT_TITLE = '@ui/layout/title/UPDATE_LAYOUT_TITLE';

export function updateLayoutTitle(title) {
  return {
    type: UPDATE_LAYOUT_TITLE,
    title,
  };
}
