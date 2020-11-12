import React, { useContext , useEffect } from "react";
import { UserContext } from "../context/user/context";

function Home() {
  const context = useContext(UserContext);
  // useEffect(() => {
  //   context.loadUser();
  // }, []);
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
}

export default Home;
