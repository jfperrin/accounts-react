import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import ImportIcon from '@material-ui/icons/ImportExport';
import Operations from '../../Operations';
import Balances from '../../Balances';
import query from '../gqlQueries/get';
import addRecurrentOperations from '../gqlQueries/addRecurrentOperations';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../../actions/ui/layout/title';
import Button from '../../common/Button';

class Period extends Component {
  addRecurrentOperations(id) {
    const { addRecurrentOperations, data } = this.props;

    addRecurrentOperations({
      variables: {
        id,
      },
    }).then(() => data.refetch());
  }

  componentDidUpdate() {
    const { data, updateLayoutTitle } = this.props;

    if (!data.loading) {
      updateLayoutTitle(`Operations#${data.period.display}`);
    }
  }

  render() {
    const { data, match } = this.props;

    if (data.loading) {
      return <div>Loading...</div>;
    }

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
              <div style={{ width: 45, paddingTop: '5px' }}>
                <Button size={'small'} onClick={() => this.addRecurrentOperations(data.period.id)}>
                  <ImportIcon />
                </Button>
              </div>
            </div>
            <div style={{ display: 'flex', padding: '15px' }}>
              <div style={{ width: '33%', whiteSpace: 'nowrap' }}>Opérations: {data.period.balance.operations.toFixed(2)} €</div>
              <div style={{ width: '33%', textAlign: 'center', whiteSpace: 'nowrap' }}>Banque: {data.period.balance.banks.toFixed(2)} €</div>
              <div style={{ width: '34%', textAlign: 'right', whiteSpace: 'nowrap' }}>Solde: {(data.period.balance.operations + data.period.balance.banks).toFixed(2)} €</div>
            </div>
          </div>
        </div>
        <Operations idPeriod={match.params.id} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayoutTitle: title => {
      dispatch(updateLayoutTitleAction(title));
    },
  };
}

const mutations = compose(
  graphql(addRecurrentOperations, {
    name: 'addRecurrentOperations',
  }),
);

export default mutations(
  graphql(query, {
    options: props => {
      return { variables: { id: props.match.params.id } };
    },
  })(connect(null, mapDispatchToProps)(Period)),
);
