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
export const ADD_NOTE = gql`
  mutation addNote($title: String!, $body: String!) {
    addNote(title: $title, body: $body) {
      _id
      title
      body
      createdAt
      updatedAt
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


