const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  search,
  nSearchPages,
}) => {
  const pageNumbers = !search
    ? [...Array(nPages + 1).keys()].slice(1)
    : [...Array(nSearchPages + 1).keys()].slice(1);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(pageNumbers.length);
  };

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul>
        <li>
          <p>
            Page {currentPage} of {pageNumbers.length}
          </p>
        </li>
        <li className="page-item">
          <button className="first-page" onClick={goToFirstPage}>
            «
          </button>
        </li>
        <li className="page-item">
          <button className="previous-page" onClick={goToPrevPage}>
            ‹
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""} `}
          >
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="next-page" onClick={goToNextPage}>
            ›
          </button>
        </li>
        <li className="page-item">
          <button className="last-page" onClick={goToLastPage}>
            »
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
