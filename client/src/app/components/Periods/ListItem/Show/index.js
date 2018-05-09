import React from 'react';
import { Link } from 'react-router-dom';

import BalanceIcon from 'material-ui/svg-icons/action/account-balance';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

export default ({ entity }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '30px', paddingTop: '5px' }}>
        <Link to={`/period/${entity.id}`}>{entity.display}</Link>
      </div>
      <div style={{ marginRight: '15px' }}>
        <Chip>
          <Avatar color={ entity.balance.banks + entity.balance.operations > 0 ? 'green' : 'red' } icon={<BalanceIcon />} />
          {(entity.balance.banks + entity.balance.operations).toFixed(2)} €
        </Chip>
      </div>
    </div>
  );
};
