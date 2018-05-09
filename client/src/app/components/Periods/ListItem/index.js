import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import mutation from '../gqlQueries/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { toggleEditForm } from '../../../actions/ui/crud/updateForm';
import { getCrudEditState as getCrudEditStateSelector } from '../../../selectors/ui'
import Show from './Show/index';
import Edit from './Edit/index';
import './stylesheet.css';


class PeriodComponent extends Component {

  constructor() {
    super();

    this.iconStyle = { cursor: 'pointer' };
  }

  deletePeriod(period) {
    this.props.mutate({
      variables: { id: period.id }
    }).then(() => this.props.refetch());
  }

  render() {
    const { period, edit, toggleEdit, hideAction } = this.props;
    const periodView = edit ? <Edit period={period} /> : <Show entity={period} />;

    return (
      <div className="period">
        <div className="label">
          {periodView}
        </div>
        {(!hideAction && !edit) && <div className={'actions'}>
          <EditIcon onClick={() => toggleEdit(period.id)} style={this.iconStyle} />
          <DeleteIcon onClick={() => this.deletePeriod(period)} style={this.iconStyle} />
        </div>
        }
      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEdit: (id) => {
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
