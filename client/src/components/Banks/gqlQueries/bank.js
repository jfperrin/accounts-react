import { gql } from '@apollo/client';

export default gql`
  fragment bankFragment on BanksType {
    id
    label
    isDeleted
  }
`;
