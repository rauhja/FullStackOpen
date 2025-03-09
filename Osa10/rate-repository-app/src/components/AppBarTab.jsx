import { Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ label, destination, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "white", padding: 16 }}
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable>
      <Link to={destination}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "white", padding: 16 }}
        >
          {label}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
