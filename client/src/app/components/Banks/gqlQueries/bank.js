import { gql } from 'apollo-boost';

export default gql`
  fragment bankFragment on BanksType {
    id
    label
    isDeleted
  }
`;
