import React, { useState, useContext } from "react";
import { PostContext } from "../context/post/context";

function Create() {
  const [post, setPost] = useState({ title: "", body: "" });
  const [image, setImage] = useState("");
  const context = useContext(PostContext);
  console.log(context.imageLoad);
  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }
  function handleImage(e) {
    setImage(e.target.files[0]);
    console.log(e.target.files);
  }
  function Post(e) {
    e.preventDefault();
    context.postImage(image);
  }
  function finalPost(e) {
    e.preventDefault();
    context.postFinal({
      title: post.title,
      body: post.body,
      // photo: context.uri,
    });
  }
  return (
    <div>
      <div className="container-fluid body d-flex">
        <div
          className="row  mx-auto"
          style={{ width: "70%", paddingTop: "5%", paddingBottom: "5%" }}
        >
          {/* SIGN IN SECTION */}
          <div className="col-lg-6 bg-info">
            <form className="signin">
              <h3>Sign In</h3>
              <div className="form-group mt-5">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  name="body"
                  value={post.body}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-lg btn-success  ml-3"
                onClick={Post}
                type="submit"
              >
                {context.imageLoad ? "UPLOADING" : "UPLOAD"}
              </button>
              <button
                className="btn btn-lg btn-success  ml-3"
                onClick={finalPost}
                type="submit"
              >
                POSTTODB
              </button>
            </form>
          </div>

          <input type="file" onChange={handleImage} />
          {/* SIGN UP SECTION */}
        </div>
      </div>
    </div>
  );
}

export default Create;
