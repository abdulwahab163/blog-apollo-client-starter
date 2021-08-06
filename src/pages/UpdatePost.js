import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { UPDATE_POST, GET_POSTS, GET_POST } from "../queries/index";

export const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
    onCompleted: () => {
      setTitle(data.getPost.title);
      setDescription(data.getPost.description);
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (networkError) {
        console.log(networkError);
      }
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) => console.log(message));
      }
    },
  });

  const [updatePost, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_POST, {
      onError: ({ graphQLErrors, networkError }) => {
        if (networkError) {
          console.log(networkError);
        }
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) => console.log(message));
        }
      },
    });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (mutationLoading) return "Updating...";
  if (mutationError) return `Error While Updating! ${mutationError.message}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: 400,
        height: 400,
      }}
    >
      <h1>Update Post</h1>
      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={{
          marginTop: "20px",
          height: 500,
        }}
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Link to="/">
        <button
          style={{
            marginTop: "20px",
          }}
          onClick={() => {
            setTitle("");
            setDescription("");
            updatePost({
              variables: {
                id,
                title,
                description,
              },
              refetchQueries: [{ query: GET_POSTS }],
            });
          }}
        >
          Update Post
        </button>
      </Link>
    </div>
  );
};
