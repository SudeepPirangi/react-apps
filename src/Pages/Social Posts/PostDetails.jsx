import { useState, useEffect } from "react";

const PostDetails = ({ getPost }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log(`PostDetails re-rendered by getPost()`);
    getPost().then((post) => {
      setPost(post);
    });
  }, [getPost]);

  return (
    post && (
      <>
        <h3>
          {post.id}. {post.title}
        </h3>
        <p className="body">{post.body}</p>
      </>
    )
  );
};

export default PostDetails;
