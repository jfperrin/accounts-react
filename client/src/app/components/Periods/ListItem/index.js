import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { toggleEditForm } from '../../../actions/ui/crud/updateForm';
import mutation from '../gqlQueries/delete';
import { getCrudEditState as getCrudEditStateSelector } from '../../../selectors/ui';
import Show from './Show/index';
import Edit from './Edit/index';
import './stylesheet.css';

class PeriodComponent extends Component {
  constructor() {
    super();

    this.iconStyle = { cursor: 'pointer' };
  }

  deletePeriod(period) {
    const { mutate, refetch } = this.props;
    mutate({
      variables: { id: period.id },
    }).then(() => refetch());
  }

  render() {
    const { period, edit, toggleEdit, hideAction } = this.props;
    const periodView = edit ? <Edit period={period} /> : <Show entity={period} />;

    return (
      <div className="period">
        <div className="label">{periodView}</div>
        {!hideAction && !edit && (
          <div className={'actions'}>
            <EditIcon onClick={() => toggleEdit(period.id)} fontSize={'small'} style={this.iconStyle} />
            <DeleteIcon onClick={() => this.deletePeriod(period)} fontSize={'small'} style={this.iconStyle} />
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEdit: id => {
      dispatch(toggleEditForm('period', id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    edit: getCrudEditStateSelector(state, { entity: 'period', id: ownProps.period.id }),
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(PeriodComponent));
