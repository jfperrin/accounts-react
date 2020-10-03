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
