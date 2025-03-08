import { gql } from "@apollo/client";

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    ownerAvatarUrl
    fullName
    description
    forksCount
    language
    stargazersCount
    reviewCount
    ratingAverage
  }
`;
