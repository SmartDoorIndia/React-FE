import React from 'react';

export function TimeCell(props) {
  const { text } = props.itemData;
  return (
    <div style={ { height: '81px' } }>
      {text}
    </div>
  );
}

export function DateCell(props) {
  const { text } = props.itemData;
  return (
    <div style={ { width: '150px' } }>
      <div>{text}</div>
    </div>
  );
}

export class DataCell extends React.PureComponent {
  render() {
    const { text } = this.props;

    return (
      <div className="dx-template-wrapper" style={ { height: '75px' } }>
        <div>
          {text}
        </div>
      </div>
    );
  }
}
