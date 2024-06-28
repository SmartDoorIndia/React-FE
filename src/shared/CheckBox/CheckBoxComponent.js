/** @format */

import './checkbox.scss';

function CheckBoxComponent(props) {
  return (
    <>
      <input
        className="styled-checkbox"
        id={ props.id }
        type="checkbox"
        value={ props.value }
        checked={ props.checked }
        onChange={ props.onChange }
      />
      <label htmlFor={ props.id } className="fs-14">
        {props.label}
      </label>
    </>
  );
}

export default CheckBoxComponent;
