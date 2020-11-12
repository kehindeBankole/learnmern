import React, { useReducer } from "react";
import { PostContext } from "./context";
import PostReducer from "./reducer";

function PostState(props) {
  const initState = {
    load: true,
    posts: [],
    error: null,
    uri: "",
    imageLoad: false,
  };
  function getPosts(token) {
    if (localStorage.token) {
      token = localStorage.getItem("token");
      fetch("http://localhost:8080/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: "postSuccess",
            payload: data,
          });
        })
        .catch((error) => {
          dispatch({
            type: "postFail",
            payload: error,
          });
        });
    }
  }
  function postImage(image) {
    dispatch({ type: "loadingImage" });
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "instamern");
    formData.append("cloud_name", "kehindebankole");

    fetch("https://api.cloudinary.com/v1_1/kehindebankole/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          dispatch({ type: "cloudFail", payload: result.error });
        } else {
          dispatch({ type: "cloudSuccess", payload: result });
        }
      })
      .catch((error) => {
        dispatch({ type: "cloudFail", payload: error });
      });
  }
  function postFinal(data) {
    dispatch({type : "posting"})
    fetch("http://localhost:8080/post", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const [state, dispatch] = useReducer(PostReducer, initState);
  return (
    <PostContext.Provider
      value={{
        load: state.load,
        posts: state.posts,
        error: state.error,
        uri: state.uri,
        getPosts,
        postImage,
        postFinal,
        imageLoad: state.imageLoad,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export default PostState;
