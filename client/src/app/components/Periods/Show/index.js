import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ImportIcon from '@material-ui/icons/ImportExport';
import Operations from '../../Operations';
import Balances from '../../Balances';
import addRecurrentOperationsMutation from '../gqlQueries/addRecurrentOperations';
import get from '../gqlQueries/get';
import { updateLayoutTitle } from '../../../actions/ui/layout/title';
import Index from '../../common/Button';

const line = {
  display: 'flex',
  marginBottom: '15px',
};

const block = {
  flex: 1,
  padding: '5px',
  marginRight: '5px',
  border: 'solid 1px #F1F1F1',
};

const Period = ({ match }) => {
  const dispatch = useDispatch();
  const [addRecurrentOperations] = useMutation(addRecurrentOperationsMutation);
  const { loading, data, refetch } = useQuery(get, { variables: { id: match.params.id } });

  useEffect(() => {
    if (data && !loading) {
      dispatch(updateLayoutTitle(`Operations#${data.period.display}`));
    }
  }, [loading, data, dispatch]);

  if (!data) return null;

  const handleAddRecurrentOperations = async () => {
    await addRecurrentOperations({ variables: { id: match.params.id } });
    await refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="operations">
      <div style={line}>
        <div style={block}>
          <Balances idPeriod={match.params.id} />
        </div>
        <div style={block}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginTop: '13px' }}>Solde</h3>
            </div>
            <div
              style={{
                width: 45,
                paddingTop: '5px',
              }}
            >
              <Index size={'small'} onClick={handleAddRecurrentOperations}>
                <ImportIcon />
              </Index>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '15px',
            }}
          >
            <div
              style={{
                width: '33%',
                whiteSpace: 'nowrap',
              }}
            >
              Opérations: {data.period.balance.operations.toFixed(2)} €
            </div>
            <div
              style={{
                width: '33%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Banque: {data.period.balance.banks.toFixed(2)} €
            </div>
            <div
              style={{
                width: '34%',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              Solde: {(data.period.balance.operations + data.period.balance.banks).toFixed(2)} €
            </div>
          </div>
        </div>
      </div>
      <Operations idPeriod={match.params.id} />
    </div>
  );
};

export default Period;
