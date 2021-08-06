import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { Post } from "./../components/Post";
import { GET_POSTS, SEARCH_POSTS } from "./../queries";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    loading,
    error,
    data: posts,
  } = useQuery(GET_POSTS, {
    onError: ({ graphQLErrors, networkError }) => {
      if (networkError) {
        console.log("networkError", networkError);
      }
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => console.log(message));
      }
    },
  });

  const {
    data: postResult,
    loading: postResultLoading,
    error: postResultError,
    refetch,
  } = useQuery(SEARCH_POSTS, {
    variables: {
      searchValue: searchQuery,
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

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (postResultLoading) return "Searching...";
  if (postResultError) return `Searching Error! ${error.message}`;

  const hanldeSearch = async (e) => {
    setSearchQuery(e.target.value);
    await refetch({ searchValue: e.currentTarget.value });
  };

  return (
    <>
      {posts && posts.getAllPosts.length > 0 ? (
        <div
          style={{
            marginLeft: "40%",
          }}
        >
          <h3>Search Post</h3>
          <div>
            <input
              placeholder="Search Posts"
              value={searchQuery}
              onChange={(e) => hanldeSearch(e)}
            />
          </div>
        </div>
      ) : (
        <h1>No Posts</h1>
      )}

      <div
        style={{
          marginLeft: "40%",
        }}
      >
        {!searchQuery ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            {posts.getAllPosts &&
              posts.getAllPosts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  author={"abdul wahab"}
                  description={post.description}
                  createdAt={post.createdAt}
                />
              ))}
          </div>
        ) : (
          postResult.searchPosts &&
          postResult.searchPosts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              author={"abdul wahab"}
              description={post.description}
              createdAt={post.createdAt}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Home;
