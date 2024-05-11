import { useState, useEffect } from "react";

const Pagination = ({
  itemsPerPage = 10,
  total = 100,
  itemToDisplay,
  children,
}) => {
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(total / perPage);

  useEffect(() => {
    if (currentPage > pages) {
      setCurrentPage(pages);
    } else {
      let min = (currentPage - 1) * +perPage;
      let max = min + +perPage;
      console.log("perpage, current", perPage, currentPage, min, max);
      itemToDisplay(min, max);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage, currentPage]);

  return (
    <>
      <div className="page-size">
        <label htmlFor="itemsPerPage">Posts per page:</label>
        <select
          id="itemsPerPage"
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="posts">{children}</div>

      <div className="button-group">
        {new Array(pages).fill(null).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
