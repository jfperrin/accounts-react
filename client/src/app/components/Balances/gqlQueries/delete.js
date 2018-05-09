import gql from 'graphql-tag';

export default gql`
  mutation DeleteBalance($id: ID){
    deleteBalance(id: $id) {
      id
    }
  }
`;
