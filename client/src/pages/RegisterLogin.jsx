import React, { useContext, useEffect, useState } from "react";
import { UiContext } from "../context/ui/context";
import { UserContext } from "../context/user/context";
import Toasts from "../components/Toast";
import "./RegisterLogin.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function RegisterLogin(props) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [load, setload] = useState(false);
  const context = useContext(UiContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  function handleModal(e) {
    e.preventDefault();
    context.modalClick(true);
  }
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  function register(e) {
    e.preventDefault();
    userContext.register(user);
  }
  function signIn(e) {
    e.preventDefault();
    userContext.logIn({
      email: user.email,
      password: user.password,
    });
  }
  useEffect(() => {
    if (userContext.isAuth === true) {
      props.history.push("/feed");
    }
    // userContext.loadUser();
  }, [userContext.isAuth, history]);
  return (
    <div style={{ display: `${userContext.isAuth === true}? none : block` }}>
      <div className="container-fluid body d-flex">
        <div
          className="row  mx-auto"
          style={{ width: "70%", paddingTop: "5%", paddingBottom: "5%" }}
        >
          {/* SIGN IN SECTION */}
          <div className="col-lg-6 bg-info">
            <Toasts animation />
            <form className="signin">
              <h3>Sign In</h3>
              <div className="form-group mt-5">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={signIn}
                disabled={!userContext.loginload}
              >
                {userContext.loginload ? (
                  "sign in"
                ) : (
                  <div>
                    {" "}
                    <FontAwesomeIcon icon={faSpinner} className="spin" />
                    <span className="ml-2">signing in</span>
                  </div>
                )}
              </button>

              <button
                className="btn btn-lg btn-success d-lg-none ml-3"
                onClick={handleModal}
                type="submit"
              >
                SIGN UP
              </button>
            </form>
          </div>

          {/* SIGN UP SECTION */}
          <div className="col-lg-6 bg-primary d-none d-lg-block">
            <form className="signin">
              <h3>Sign Up</h3>
              <h5>dont have an account ? Sign Up</h5>
              <h2 className="mt-5" style={{ lineHeight: "1.5em" }}>
                See what’s happening in the world right now
              </h2>
              <button
                className="btn btn-success mt-5 btn-lg"
                onClick={handleModal}
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <div className={context.modalbtnclick === false ? `nomod` : `mod`}>
        <Toasts />
        <div className="modcontent">
          <button
            className="btn btn-danger btn-sm"
            style={{ float: "right" }}
            onClick={() => context.modalClick(false)}
          >
            close
          </button>
          <form>
            <h3>Sign Up</h3>
            <div className="form-group mt-5">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Enter name"
                autoComplete="true"
                onChange={handleChange}
                name="name"
                value={user.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleChange}
                name="email"
                value={user.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={user.password}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={register}
            >
              {userContext.registerload ? (
                "submit"
              ) : (
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faSpinner} className="spin" />
                  <span className="ml-2">registration in progress</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
