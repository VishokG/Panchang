import React from 'react';

const PTRow = (props) => {
  const styleObj = {};

  if (props.blank) {
    styleObj.borderTopStyle = 'hidden';
  }

  if (props)
    return (
      <tr>
        <td style={styleObj} className="td1">
          {props.title}
        </td>
        {<td style={styleObj}>{props.content}</td>}
      </tr>
    );
};

export default PTRow;
