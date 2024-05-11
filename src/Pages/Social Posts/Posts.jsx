import { useState, useEffect, useMemo, useCallback } from "react";

import Pagination from "../../Components/pagination";
import Post from "./Post";
import PostDetails from "./PostDetails";
import { fetchPosts, fetchPost } from "../../Services/post-services";
import { asyncOperation } from "../../utils/Posts";
import constants from "../../constants";

import "./Posts.css";

const { ITEMS_PER_PAGE } = constants;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [heavyComputationId, setHeavyComputationId] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setPosts(await fetchPosts());
    } catch (error) {
      console.error(error);
    }
  };

  const postsToDisplay = (min, max) => {
    setPaginatedPosts(posts.slice(min, max));
  };

  // this getPost function gets triggered only when any post is selected
  // it doesn't get recreated and fetch post everytime some rerender happens in Posts component
  const getPost = useCallback(async () => {
    let post = null;
    try {
      post = await fetchPost(selectedPost);
    } catch (error) {
      console.error(error);
    }
    return post;
  }, [selectedPost]);

  // asyncOperation() will not be called between rerenders of pages
  // runs only when "Compute" button on different posts are clicked
  const calculateTime = useMemo(() => {
    const start = performance.now();
    const computeResponse = asyncOperation(heavyComputationId);
    const end = performance.now();
    console.log(`Computation ran for ${end - start}ms`);
    return [computeResponse, end - start];
  }, [heavyComputationId]);

  const heavyComputation = (ev, postId) => {
    ev.stopPropagation();
    setHeavyComputationId(postId);
  };

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <div className="container">
      {/* Left section of the page with list of posts */}
      <div className="posts-list">
        <h1>Social Posts</h1>
        {posts?.length ? (
          <div className="all-posts">
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              total={posts.length}
              itemToDisplay={postsToDisplay}
            >
              {paginatedPosts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  heavyComputation={heavyComputation}
                  handlePostClick={handlePostClick}
                />
              ))}
            </Pagination>
          </div>
        ) : (
          <h3>No posts to display</h3>
        )}
      </div>

      {/* Right section of the page with details of selected posts */}
      <div className="more-info">
        <h1>Post Details</h1>
        {heavyComputationId && (
          <div className="compute-time">
            <h3>{`Post-${heavyComputationId} took ${calculateTime[1]}ms to execute`}</h3>
          </div>
        )}
        {selectedPost && (
          <div className="post-details">
            <PostDetails getPost={getPost} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
