import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    gap: 16,
  },
  textField: {
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
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textField,
          {
            borderColor:
              formik.touched.username && formik.errors.username
                ? theme.colors.error
                : "gray",
          },
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          styles.textField,
          {
            borderColor:
              formik.touched.password && formik.errors.password
                ? theme.colors.error
                : "gray",
          },
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={{ color: "white" }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
