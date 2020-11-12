export default function UserReducer(state, action) {
  switch (action.type) {
    case "loginrequest":
      return {
        ...state,
        loginload: false,
      };
    case "registerrequest":
      return {
        ...state,
        registerload: false,
      };
    case "loadSuccess":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuth: true,
        loginload: false,
        registerload: false,
        user: action.payload,
      };
    case "registerSuccess":
    case "loginSuccess":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("auth", true);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        ...action.payload,
        loginload: false,
        registerload: false,
        isAuth: true,
        errordata: action.payload.msg,
      };
    case "registerFail":
    case "loadFail":
    case "logout":
    case "loginFail":
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        loginload: true,
        registerload: true,
        isAuth: false,
        user: null,
        // error: action.payload,
        // errordata: action.payload,
      };
    case "errordata":
      console.log(action.payload);
      return {
        ...state,
        errordata: action.payload,
        loginload: true,
        registerload: true,
      };
    case "noerror":
      return {
        ...state,
        errordata: null,
        loginload: true,
        registerload: true,
      };
    default:
      return state;
  }
}
