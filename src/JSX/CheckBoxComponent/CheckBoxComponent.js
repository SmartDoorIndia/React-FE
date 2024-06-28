/** @format */

import React from 'react';
import './checkbox.scss';

function CheckBoxComponent(props) {
  return (
    <>
      <input className="styled-checkbox" id={ props.id } type="checkbox" value={ props.value } />
      <label htmlFor={ props.id } className="fs-14">
        {/* check box text here       */}
      </label>
    </>
  );
}

export default CheckBoxComponent;
