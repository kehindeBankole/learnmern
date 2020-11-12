export default function UiReducer(state, action) {
  switch (action.type) {
    case "modalclick":
      return {
        ...state,
        modalbtnclick: action.payload,
      };
    case "disableclick":
      return {
        ...state,
        disable: action.payload,
      };
    default:
      return state;
  }
}
