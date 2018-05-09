import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import ImportIcon from 'material-ui/svg-icons/communication/import-export';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Operations from '../../Operations';
import Balances from '../../Balances';
import query from '../gqlQueries/get';
import addRecurrentOperations from '../gqlQueries/addRecurrentOperations';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../../actions/ui/layout/title'

class Period extends Component {
  addRecurrentOperations(id) {
    this.props.addRecurrentOperations({
      variables: {
        id,
      },
    }).then(() => this.props.data.refetch());
  }


  componentWillReceiveProps() {
    if (!this.props.data.loading) {
      this.props.updateLayoutTitle(`Operations#${this.props.data.period.display}`);
    }
  }

  render() {

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    const line = {
      display: 'flex',
      marginBottom: '15px'
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
            <Balances idPeriod={this.props.match.params.id} />
          </div>
          <div style={block}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginTop: '13px' }}>
                  Solde
                </h3>
              </div>
              <div style={{ width: '45px', paddingTop: '5px' }}>
                <FloatingActionButton mini={true}
                                      onClick={() => this.addRecurrentOperations(this.props.data.period.id)}>
                  <ImportIcon />
                </FloatingActionButton>
              </div>
            </div>
            <div style={{ display: 'flex', padding: '15px' }}>
              <div style={{ width: '33%', whiteSpace: 'nowrap' }}>
                Opérations: {this.props.data.period.balance.operations.toFixed(2)} €
              </div>
              <div style={{ width: '33%', textAlign: 'center', whiteSpace: 'nowrap' }}>
                Banque: {this.props.data.period.balance.banks.toFixed(2)} €
              </div>
              <div style={{ width: '34%', textAlign: 'right', whiteSpace: 'nowrap' }}>
                Solde: {(this.props.data.period.balance.operations + this.props.data.period.balance.banks).toFixed(2)} €
              </div>
            </div>
          </div>
        </div>
        <Operations idPeriod={this.props.match.params.id} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayoutTitle: (title) => {
      dispatch(updateLayoutTitleAction(title));
    },
  };
}

const mutations = compose(
  graphql(addRecurrentOperations, {
    name: 'addRecurrentOperations',
  }),
);

export default mutations(graphql(query, {
  options: (props) => {
    return { variables: { id: props.match.params.id } };
  },
})(connect(null, mapDispatchToProps)(Period)));
