/** @format */

import React from 'react';
import Pagination from '../Pagination';

const PaginationComponent = (props) => {
  // const PaginationActionButton = () => (
  //     <div className="d-flex justify-content-between tableBottom">
  //       </div>
  //     );

  return (
  // PaginationActionButton={props.PaginationActionButton}
    <Pagination { ...props } PaginationActionButton={ props.PaginationActionButton } />
  );
};

export default PaginationComponent;
