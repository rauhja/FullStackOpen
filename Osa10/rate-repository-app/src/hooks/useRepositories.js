import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     const response = await fetch("http://192.168.1.101:5001/api/repositories");
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  const repositories = data ? data.repositories : [];
  return { repositories, loading, error };
};

export default useRepositories;
