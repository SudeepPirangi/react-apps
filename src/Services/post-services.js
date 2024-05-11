export const fetchPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
    response.json()
  );

export const fetchPost = (postId) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
    (response) => response.json()
  );
