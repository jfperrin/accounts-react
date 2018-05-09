import gql from 'graphql-tag';
import bankFragment from './bank';

export default gql`
  {
    banks {
      ...bankFragment
    }
  }
  ${bankFragment}
`;

export const CREATE_BANK_SUBSCRIPTION = gql`
  subscription {
    createBank {
      ...bankFragment
    }
  }
  ${bankFragment}
`;
