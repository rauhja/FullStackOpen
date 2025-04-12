import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
  tag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.small,
  },
});

const Tag = ({ label, testID }) => {
  return (
    <View testID={testID} style={styles.tag}>
      <Text style={{ color: "white" }}>{label}</Text>
    </View>
  );
};

export default Tag;
