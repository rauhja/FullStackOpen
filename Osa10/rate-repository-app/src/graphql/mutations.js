import { gql } from "@apollo/client";

export const AUTH_USER = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
