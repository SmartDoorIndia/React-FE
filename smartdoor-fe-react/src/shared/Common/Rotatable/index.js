/**
 *
 * Name: RotatableComponent
 * Desc: Use to Rotate Element onClick
 *
 * @format
 * @param {component} component
 */

import { useState, memo } from 'react';

const RotatableComponent = ({ component: Component }) => {
  const [ rotate, setRotate ] = useState(false);

  function _rotateELement() {
    setRotate(!rotate);
  }

  return (
    <span onClick={ () => _rotateELement() }>
      <Component className={ `rotatable ${ rotate ? '' : 'done' }` } />
    </span>
  );
};

export default memo(RotatableComponent);
