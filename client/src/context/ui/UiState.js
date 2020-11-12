import React, { useReducer } from "react";
import { UiContext } from "./context";
import UiReducer from "./reducer";

function UiState(props) {
  const initState = {
    modalbtnclick: false,
    disable: false,
  };

  function modalClick(status) {
    dispatch({ type: "modalclick", payload: status });
  }
  function disableClick(status) {
    dispatch({ type: "disableclick", payload: status });
  }
  const [state, dispatch] = useReducer(UiReducer, initState);
  return (
    <UiContext.Provider
      value={{
        modalbtnclick: state.modalbtnclick,
        disable: state.disable,
        modalClick,
        disableClick,
      }}
    >
      {props.children}
    </UiContext.Provider>
  );
}

export default UiState;
