import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/user/context";
import { PostContext } from "../context/post/context";
function Feed() {
  const context = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { load , posts , getPosts} = postContext
  
  useEffect(() => {
    getPosts();
    console.log(posts)
  }, []);

if(load) return <h1>LOADING...</h1>
  return (
    <div>
      {
        posts.map((elem , index)=>{
          return(
            <div key={index}>
              <p>{elem.title}</p>
              </div>
          )
        })
      }
    </div>
  );
}

export default Feed;
