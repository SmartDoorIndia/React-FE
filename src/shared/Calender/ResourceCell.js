/** @format */

import React from 'react';

class ResourceCell extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="dx-template-wrapper" style={ { width: '200px' } }>
        {data.text}
      </div>
    );
  }
}

export default ResourceCell;
