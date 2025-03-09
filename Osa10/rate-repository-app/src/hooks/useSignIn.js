import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../graphql/mutations";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTH_USER);

  const signIn = async ({ username, password }) => {
    return mutate({
      variables: { username: username, password: password },
    });
  };

  return [signIn, result];
};

export default useSignIn;
