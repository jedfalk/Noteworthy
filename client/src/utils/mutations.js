import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation AddProfile($input: ProfileInput!) {
    addProfile(input: $input) {
      token
      profile {
        _id
        name
        email
      }
    }
  }
`;