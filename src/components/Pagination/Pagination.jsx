import React from "react";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  const { handlePageClick, pageCount, currentPage, forcePage } = props;
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={pageCount > currentPage ? "Next >" : null}
      breakClassName="page-item"
      breakAriaLabels={""}
      breakLinkClassName="page-link"
      onPageChange={(e) => handlePageClick(e)}
      forcePage={forcePage}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel={pageCount > 1 ? "< Previous" : null}
      renderOnZeroPageCount={null}
      previousClassName="pagination-btn-previous"
      nextClassName="pagination-btn-next"
      className="pagination"
      activeClassName="pagination-active-page"
      previousLinkClassName="pagination-previous-link"
      nextLinkClassName="pagination-next-link"
    />
  );
}

export default Pagination;
