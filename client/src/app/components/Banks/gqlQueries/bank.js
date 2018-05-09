import gql from 'graphql-tag';

export default gql`
  fragment bankFragment on BanksType {
    id
    label
    isDeleted
  }
`;
