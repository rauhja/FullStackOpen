import { View, StyleSheet } from "react-native";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  repositoryStatCell: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

const RepositoryStatItem = ({ itemCount, label }) => {
  const roundItem = (number) => {
    if (number > 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number;
    }
  };

  return (
    <View style={styles.repositoryStatCell}>
      <Text fontWeight="bold" fontSize="subheading">
        {roundItem(itemCount)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

export default RepositoryStatItem;
