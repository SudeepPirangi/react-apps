export const asyncOperation = (postId) => {
  console.log("async initiated");
  let iterations = 0;
  for (let i = 0; i < +postId * 100000000; i++) {
    iterations++;
  }
  return iterations;
};

// Ignore this function
export const heavyComputation = (postId) => {
  const start = new Date().getTime();
  const iterator = asyncOperation(postId);
  const end = new Date().getTime();
  return `Post ${postId} - Computation ran for ${end - start}ms`;
};
