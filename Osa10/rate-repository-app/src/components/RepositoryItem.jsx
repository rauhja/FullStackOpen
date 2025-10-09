import { View, StyleSheet, Image, Pressable } from "react-native";
import * as Linking from "expo-linking";
import Text from "./Text";
import Tag from "./Tag";
import theme from "../theme";
import RepositoryStatItem from "./RepositoryStatItem";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
  },
  flexItemRow: {
    flexDirection: "row",
    marginEnd: 16,
  },
  flexItemCol: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 8,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 16,
    borderRadius: theme.borderRadius.default,
  },
  repositoryStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  githubButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
  },
});

const GitHubButton = ({ url }) => (
  <Pressable style={styles.githubButton} onPress={() => Linking.openURL(url)}>
    <Text style={styles.githubButtonText}>Open in GitHub</Text>
  </Pressable>
);

const RepositoryItem = ({ item, showButton }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexItemRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexItemCol}>
          <Text testID="repositoryName" fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text testID="repositoryDescription" color="textSecondary">
            {item.description}
          </Text>
          <Tag testID="repositoryLanguage" label={item.language} />
        </View>
      </View>
      <View style={styles.repositoryStats}>
        <RepositoryStatItem
          testID="repositoryStars"
          itemCount={item.stargazersCount}
          label="Stars"
        />
        <RepositoryStatItem
          testID="repositoryForks"
          itemCount={item.forksCount}
          label="Forks"
        />
        <RepositoryStatItem
          testID="repositoryReviews"
          itemCount={item.reviewCount}
          label="Reviews"
        />
        <RepositoryStatItem
          testID="repositoryRating"
          itemCount={item.ratingAverage}
          label="Rating"
        />
      </View>
      {showButton && <GitHubButton url={item.url} />}
    </View>
  );
};

export default RepositoryItem;
