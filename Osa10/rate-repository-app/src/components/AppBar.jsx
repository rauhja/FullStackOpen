import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barColor,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" destination="/" />
        {data?.me ? (
          <AppBarTab label="Sign Out" onPress={handleSignOut} />
        ) : (
          <AppBarTab label="Sign In" destination="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
