export const stylePointed = operation => {
  if (operation.pointedAt) {
    return {
      backgroundColor: '#666',
      color: '#AAA',
      fontSize: '10px',
      fontStyle: 'italic',
      cursor: 'pointer',
    };
  }
  return {};
};

export const stylePointedTexts = operation => {
  if (operation.pointedAt) {
    return {
      padding: '12px 7px',
    };
  }
  return {};
};

export const stylePointedactions = operation => {
  if (operation.pointedAt) {
    return {
      padding: '5px',
    };
  }
  return {};
};
