import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
  tag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

const Tag = ({ label }) => {
  return (
    <View style={styles.tag}>
      <Text style={{ color: "white" }}>{label}</Text>
    </View>
  );
};

export default Tag;
