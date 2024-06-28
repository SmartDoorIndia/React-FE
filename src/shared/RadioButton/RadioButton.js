/** @format */

import React from 'react';
import RadioGroup from 'devextreme-react/radio-group';

const RadioButton = (props) => {
  return (
    <>
      <div >
        {/* "horizontal" */}
        <RadioGroup
          name={ props.name }
          items={ props.items }
          defaultValue={ props.defaultValue }
          layout={ props.layout }
          value={ props.value }
          onValueChanged={ props.onValueChanged }
        />
      </div>
    </>
  );
};

export default RadioButton;
