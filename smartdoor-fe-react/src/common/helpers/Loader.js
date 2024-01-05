/** @format */

import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = (props) => {
  return <Spinner animation="border" variant="danger" />;
};
export default Loader;

export const TableLoader = () => {
  return (
    <div style={ { margin: '50px', padding: '' } }>
      <Loader />
    </div>
  );
};

export const FallBackLoader = () => {
  return (
    <div className="parentDisable">
      <div className="overlay-box">
        <Loader />
      </div>
    </div>
  );
};
