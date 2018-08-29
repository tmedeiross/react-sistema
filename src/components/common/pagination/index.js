import React from 'react';
import ReactPaginate from 'react-paginate';

const previous = (
  <span className="page-link">
    <i className="fa fa-arrow-left" />
  </span>
);

const next = (
  <span className="page-link">
    <i className="fa fa-arrow-right" />
  </span>
);

const separator = <span className="page-link">...</span>;

const Pagination = ({ pageCount, handlePageClick }) => (
  <nav aria-label="Page navigation">
    <ReactPaginate
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      previousLabel={previous}
      nextLabel={next}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      breakLabel={separator}
    />
  </nav>
);

export default Pagination;
