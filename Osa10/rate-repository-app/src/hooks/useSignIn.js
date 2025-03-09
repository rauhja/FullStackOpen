import { useApolloClient, useMutation } from "@apollo/client";
import { AUTH_USER } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTH_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username: username, password: password },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
