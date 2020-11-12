import { UserContext } from "./context";
import UserReducer from "./reducer";
import React, { useReducer } from "react";
// https://www.youtube.com/watch?v=AjItjNc0bHA&list=PLs4co9a6NhMziGHd5pMwzkHIVMc9uJX4h
function UserState(props) {
  const initState = {
    loginload: true,
    registerload: true,
    token: localStorage.getItem("token"),
    user: null,
    isAuth: null,
    error: null,
    errordata: null,
  };
  function clearError() {
    dispatch({
      type: "noerror",
    });
  }
  function logOut() {
    dispatch({ type: "logout" });
  }
  // function loadUser(token) {
  //   if (localStorage.token) {
  //     token = localStorage.getItem("token");
  //     fetch("http://localhost:8080/auth", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         dispatch({
  //           type: "loadSuccess",
  //           payload: data,
  //         });
  //       })
  //       .catch((error) => {
  //         dispatch({
  //           type: "loadFail",
  //           payload: error,
  //         });
  //       });
  //   }
  // }
  function register(data) {
    dispatch({ type: "registerrequest" });

    // fetch("http://localhost:8080/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     response.json();
    //   })
    //   .then(data => {
    //     if (data.error) {
    //       console.log(data);
    //       dispatch({
    //         type: "errordata",
    //         payload: data.error,
    //       });
    //     } else {
    //       dispatch({
    //         type: "registerSuccess",
    //         payload: data,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch({
    //       type: "registerFail",
    //       payload: error,
    //     });
    //   });

    fetch("http://localhost:8080/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
          dispatch({
            type: "errordata",
            payload: data.error,
          });
        } else {
          dispatch({
            type: "registerSuccess",
            payload: data,
          });
        }
      })
      .catch((error) => {
       
        dispatch({
          type: "registerFail",
          payload: error,
        });
      });
  }
  function logIn(data) {
    dispatch({ type: "loginrequest" });
    // alert(22)
    fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          dispatch({
            type: "errordata",
            payload: data.error,
          });
        } else {
          dispatch({
            type: "loginSuccess",
            payload: data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "loginFail",
          payload: error,
        });
      });
  }
  const [state, dispatch] = useReducer(UserReducer, initState);
  return (
    <UserContext.Provider
      value={{
        loginload: state.loginload,
        registerload: state.registerload,
        token: state.token,
        user: state.user,
        isAuth: state.isAuth,
        error: state.error,
        errordata: state.errordata,
        register,
        // loadUser,
        clearError,
        logOut,
        logIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
