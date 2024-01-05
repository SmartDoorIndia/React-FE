/** @format */

import React, { Component } from 'react';

import FileViewer from 'react-file-viewer';

class FileViewerComponent extends Component {
  render() {
    return (
      <FileViewer
        fileType={ this.props.fileType[ 0 ] }
        filePath={ this.props.filePath }
        onError={ this.onError }
      />
    );
  }

  onError(e) {
    console.log('error here!!!');
  }
}

export default FileViewerComponent;
