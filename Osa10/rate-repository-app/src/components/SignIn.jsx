import { TextInput, Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";

import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    gap: 16,
  },
  textField: {
    borderColor: "gray",
    borderRadius: theme.borderRadius.default,
    borderWidth: 1,
    padding: 8,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.default,
    display: "flex",
    padding: 16,
    alignItems: "center",
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({ initialValues, onSubmit });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.textField}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={{ color: "white" }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
