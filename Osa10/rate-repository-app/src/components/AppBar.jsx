import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barColor,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" />
    </View>
  );
};

export default AppBar;
