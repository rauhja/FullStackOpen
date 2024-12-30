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
    borderRadius: 5,
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
    <View style={styles.container}>
      <View style={styles.flexItemRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexItemCol}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Tag label={item.language} />
        </View>
      </View>
      <View style={styles.repositoryStats}>
        <RepositoryStatItem itemCount={item.stargazersCount} label="Stars" />
        <RepositoryStatItem itemCount={item.forksCount} label="Forks" />
        <RepositoryStatItem itemCount={item.reviewCount} label="Reviews" />
        <RepositoryStatItem itemCount={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
