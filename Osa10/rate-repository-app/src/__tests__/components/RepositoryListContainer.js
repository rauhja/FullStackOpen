import { RepositoryListContainer } from "../../components/RepositoryListContainer";
import { render } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      const repositoryItems = getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(2);
      const [firstItem, secondItem] = repositoryItems;

      const firstRepo = repositories.edges[0].node;

      expect(firstItem).toHaveTextContent(firstRepo.fullName, {
        exact: false,
      });
      expect(firstItem).toHaveTextContent(firstRepo.description, {
        exact: false,
      });
      expect(firstItem).toHaveTextContent(firstRepo.language, {
        exact: false,
      });
      expect(firstItem).toHaveTextContent("1.6k", { exact: false });
      expect(firstItem).toHaveTextContent("21.9k", { exact: false });
      expect(firstItem).toHaveTextContent(firstRepo.ratingAverage.toString(), {
        exact: false,
      });
      expect(firstItem).toHaveTextContent(firstRepo.reviewCount.toString(), {
        exact: false,
      });

      const secondRepo = repositories.edges[1].node;
      expect(secondItem).toHaveTextContent(secondRepo.fullName, {
        exact: false,
      });
      expect(secondItem).toHaveTextContent(secondRepo.description, {
        exact: false,
      });
      expect(secondItem).toHaveTextContent(secondRepo.language, {
        exact: false,
      });
      expect(secondItem).toHaveTextContent("69", { exact: false });
      expect(secondItem).toHaveTextContent("1.8k", { exact: false });
      expect(secondItem).toHaveTextContent(
        secondRepo.ratingAverage.toString(),
        {
          exact: false,
        }
      );
      expect(secondItem).toHaveTextContent(secondRepo.reviewCount.toString(), {
        exact: false,
      });
    });
  });
});
