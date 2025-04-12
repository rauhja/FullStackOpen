import { View, StyleSheet, Image } from "react-native";
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
});

const RepositoryItem = ({ item }) => {
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
    </View>
  );
};

export default RepositoryItem;
