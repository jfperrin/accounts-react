import React from 'react';

export default ({ recurrentOperation }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ margin: 'auto 30px auto 10px', paddingTop: '5px' }}>
        Le {recurrentOperation.day} du mois
      </div>
      <div style={{ flex: 1, fontWeight: 'bold', paddingTop: '5px' }}>
        {recurrentOperation.label}
      </div>
      <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
        {recurrentOperation.amount.toFixed(2)}€
      </div>
    </div>
  );
};
