import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "./../queries/index";

const useCurrentUser = () => {
  const { data, loading, refetch, error } = useQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {},
    onError: ({ networkError, graphQLErrors }) => {
      if (networkError) {
        console.log(networkError);
      }
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) => console.log(message));
      }
    },
  });
  return { loading, data, error, refetch };
};

export default useCurrentUser;
