import React from "react";

const EditRow = () => {
  return (
    <tr>
      <td>
        <input type="text" required="required"></input>
      </td>
      <td>
        <input type="text" required="required"></input>
      </td>
      <td>
        <input type="email" required="required"></input>
      </td>
      <td>
        <input type="text"></input>
      </td>
    </tr>
  );
};

export default EditRow;
