import React from 'react';
import { Link } from 'react-router-dom';
import BalanceIcon from '@material-ui/icons/AccountBalance';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export default ({ entity }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1, marginRight: '30px', paddingTop: '5px' }}>
      <Link to={`/period/${entity.id}`}>{entity.display}</Link>
    </div>
    <div style={{ marginRight: '15px' }}>
      <Chip
        avatar={
          <Avatar style={{ color: entity.balance.banks + entity.balance.operations > 0 ? 'green' : 'red' }}>
            <BalanceIcon fontSize="small" />
          </Avatar>
        }
        label={`${(entity.balance.banks + entity.balance.operations).toFixed(2)} €`}
      />
    </div>
  </div>
);
