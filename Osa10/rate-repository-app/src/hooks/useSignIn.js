import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTH_USER);

  const signIn = async ({ username, password }) => {
    return mutate({
      variables: { username: username, password: password },
    });
  };

  return [signIn, result];
};

export default useSignIn;
