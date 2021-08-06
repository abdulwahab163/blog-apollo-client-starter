import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { ADD_POST, GET_POSTS } from "../queries/index";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [addPost, { loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_POST);

  if (mutationLoading) return "Posting...";
  if (mutationError) return `Error While Posting! ${mutationError.message}`;

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
      <h1>Add Post</h1>
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
            addPost({
              variables: { title, description },
              refetchQueries: [{ query: GET_POSTS }],
            });
          }}
        >
          Add Post
        </button>
      </Link>
    </div>
  );
};
