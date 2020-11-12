export default function PostReducer(state, action) {
  switch (action.type) {
    case "postSuccess":
      return {
        ...state,
        posts: action.payload.posts,
        load: false,
      };
    case "postFail":
      return {
        ...state,
        error: action.payload.error,
      };
    case "loadingImage":
      return {
        ...state,
        imageLoad: true,
      };
    case "ImageSuccess":
      return {
        ...state,
        imageLoad: false,
      };
    case "cloudSuccess":
      return {
        ...state,
        uri: action.payload.url,
        imageLoad: false,
      };
    case "cloudFail":
      return {
        ...state,
        imageLoad: false,
      };
    default:
      return state;
  }
}
