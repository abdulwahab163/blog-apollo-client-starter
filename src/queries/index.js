import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      joinDate
    }
  }
`;
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export const SIGN_UP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const GET_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      _id
      title
      description
      createdAt
    }
  }
`;
export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(_id: $id) {
      _id
      title
      description
      createdAt
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($title: String!, $description: String!) {
    addPost(title: $title, description: $description) {
      title
      description
    }
  }
`;
export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $description: String!) {
    updatePost(_id: $id, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(_id: $id) {
      _id
    }
  }
`;

export const SEARCH_POSTS = gql`
  query searchPosts($searchValue: String) {
    searchPosts(searchValue: $searchValue) {
      _id
      title
      description
      createdAt
    }
  }
`;
