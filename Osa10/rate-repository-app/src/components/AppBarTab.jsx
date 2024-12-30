import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ label }) => {
  return (
    <Pressable>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        style={{ color: "white", padding: 16 }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
