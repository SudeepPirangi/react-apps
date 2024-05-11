const Post = ({ post, heavyComputation, handlePostClick }) => {
  return (
    <div className="post" onClick={() => handlePostClick(post.id)}>
      <p>
        {post.id}. {post.title}
      </p>
      <button onClick={(e) => heavyComputation(e, post.id)}>Compute</button>
    </div>
  );
};

export default Post;
