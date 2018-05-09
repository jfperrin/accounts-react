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


class RecurrentOperationComponent extends Component {

  constructor() {
    super();

    this.iconStyle = { cursor: 'pointer'};
  }

  deleteRecurrentOperation(recurrentOperation) {
    this.props.mutate({
      variables: { id: recurrentOperation.id }
    }).then(() => this.props.refetch());
  }

  render() {
    const { recurrentOperation, edit, toggleEdit } = this.props;
    const recurrentOperationView = edit ? <Edit recurrentOperation={recurrentOperation} /> : <Show recurrentOperation={recurrentOperation} />;

    return (
      <div className="recurrentOperation">
        <div className="label">
        {recurrentOperationView}
        </div>
        {!edit && <div className={'actions'}>
        <EditIcon onClick={() => toggleEdit(recurrentOperation.id)} style={this.iconStyle}  />
        <DeleteIcon onClick={() => this.deleteRecurrentOperation(recurrentOperation)} style={this.iconStyle}/>
        </div>
        }
      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEdit: (id) => {
      dispatch(toggleEditForm('recurrentOperation', id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    edit: getCrudEditStateSelector(state, { entity: 'recurrentOperation', id: ownProps.recurrentOperation.id }),
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(RecurrentOperationComponent));
