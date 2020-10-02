export const MODALE_OPENED = '@ui/layout/menu/MODALE_OPENED';
export function updateModaleOpened(modaleOpened) {
  return {
    type: MODALE_OPENED,
    modaleOpened,
  };
}

export const MODALE_ENTITY = '@ui/layout/menu/MODALE_ENTITY';
export function updateModaleEntity(modaleEntity) {
  return {
    type: MODALE_ENTITY,
    modaleEntity,
  };
}
