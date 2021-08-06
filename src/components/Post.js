import React from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_POSTS, DELETE_POST } from "./../queries/index";

export const Post = ({ title, description, createdAt, id, author }) => {
  const [deletePost, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_POST, {
      onError: ({ graphQLErrors, networkError }) => {
        if (networkError) {
          console.log(networkError);
        }
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) => console.log(message));
        }
      },
    });

  if (mutationLoading) return "Deleting Post...";
  if (mutationError)
    return `Error While Deleting Post! ${mutationError.message}`;
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
      <div>
        Posted By: <span style={{ fontWeight: 700 }}>{author}</span>
      </div>
      <h6>{new Date(parseInt(createdAt)).toDateString()}</h6>
      <button
        onClick={() => {
          deletePost({
            variables: { id },
            refetchQueries: [{ query: GET_POSTS }],
          });
        }}
      >
        Delete
      </button>
      <Link to={"/update-post/" + id}>
        <button style={{ marginLeft: 5 }} type="button">
          Update
        </button>
      </Link>
    </div>
  );
};
