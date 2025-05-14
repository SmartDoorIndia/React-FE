/** @format */

import React from 'react';

/**
 *Name: Buttons
 *Desc: Render button
 * @param {*} text
 * @param {*} icon
 * @param {*} onClick
 * @param {*} primary
 * @param {*} secondary
 * @param {*} tertiary
 * @param {*} buttonIcon
 * @param {*} buttonGray
 */
const Buttons = (props) => {
  const { size, varient, color, className, ref, ...rest } = props;
  const name = `btn ${size || "Small"} ${color || "primary"} ${className || ""} ${varient || ""}`;

  return (
    <React.Fragment>
      <button
        id={props.id} 
        className={ name }
        type={ props.type }
        disabled={ props.disabled }
        onClick={ props.onClick }
        ref={props.ref}
        { ...rest }>
        {props.iconSrc ? <img src={ props.iconSrc } className="mr-2" alt="i" /> : ''}
        {props.name}
      </button>
    </React.Fragment>
  );
};

export default Buttons;
