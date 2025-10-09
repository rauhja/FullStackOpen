import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      id
      username
    }
  }
`;
