import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCrudEditState as getCrudEditStateSelector } from '../../../selectors/ui'
import Show from './Show/index';
import Edit from './Edit/index';

class OperationComponent extends Component {
  render() {
    const { operation, edit, idPeriod, hideAction } = this.props;

    if (edit) {
      return (<Edit idPeriod={idPeriod} operation={operation} />);
    }
    return (<Show hideAction={hideAction} idPeriod={idPeriod} operation={operation} />);
  };
}

function mapStateToProps(state, ownProps) {
  return {
    edit: getCrudEditStateSelector(state, { entity: 'operation', id: ownProps.operation.id }),
  };
}

export default connect(mapStateToProps, null)(OperationComponent);
