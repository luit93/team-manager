import React from "react";
import { Button } from "react-bootstrap";
const HiddenRow = ({ item, handleOnEdit }) => {
  return (
    <tr>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        <Button
          onClick={(e) => {
            handleOnEdit(e, item);
          }}
        >
          Edit
        </Button>
      </td>
      <td>
        <Button variant="danger">Delete</Button>
      </td>
    </tr>
  );
};

export default HiddenRow;
