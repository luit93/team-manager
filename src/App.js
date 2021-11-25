import "./App.css";
import { Table, Button } from "react-bootstrap";
import React, { useEffect, useState, useRef, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import HiddenRow from "./components/HiddenRow";
import EditRow from "./components/EditRow";
function App() {
  const initialState = [
    {
      firstName: "Mark",
      lastName: "Hamill",
      email: "luke@joker.com",
      phone: "9999999999",
    },
    {
      firstName: "Neil",
      lastName: "Gaiman",
      email: "tiamat@dream.com",
      phone: "9999999991",
    },
  ];
  const [data, setData] = useState(initialState);
  const [editDataEmail, setEditDataEmail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const handleOnEdit = (e, item) => {
    e.preventDefault();
    setEditDataEmail(item.email);
  };
  const handleOnClick = () => {
    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const mail = emailRef.current.value;
    const num = phoneRef.current.value;
    if (
      //regular expressions for input validation
      /[^a-zA-Z]/.test(fName) &&
      /[^a-zA-Z]/.test(lName) &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail) &&
      /[^0-9]/.test(num) &&
      fName.length < 256 &&
      lName.length < 256 &&
      mail.length > 256 &&
      num.length === 10
    ) {
      setData([
        ...data,
        {
          firstName: fName,
          lastName: lName,
          email: mail,
          phone: num,
        },
      ]);
    }
  };
  return (
    <div className="App">
      <h4 className="title"> MY TEAM</h4>
      <form>
        <Table striped bordered hover>
          <thead>
            <tr className="table-header">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <Fragment>
                {editDataEmail === item.email ? (
                  <EditRow />
                ) : (
                  <HiddenRow item={item} handleOnEdit={handleOnEdit} />
                )}
              </Fragment>
            ))}
            <tr></tr>
            <tr>
              <td>
                {" "}
                {showForm ? (
                  <input
                    name="fName"
                    type="text"
                    ref={fNameRef}
                    required="required"
                  />
                ) : (
                  <span onClick={() => setShowForm(true)}>
                    {" "}
                    <i class="fas fa-plus yellow"></i> Add new member
                  </span>
                )}
              </td>
              <td>
                {" "}
                {showForm && (
                  <input
                    name="lName"
                    type="text"
                    ref={lNameRef}
                    required="required"
                  />
                )}
              </td>
              <td>
                {showForm && (
                  <input
                    name="email"
                    type="email"
                    ref={emailRef}
                    required="required"
                  />
                )}
              </td>
              <td>{showForm && <input name="phone" ref={phoneRef} />}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </form>
      <Button className="save-button" variant="warning" onClick={handleOnClick}>
        Save Changes
      </Button>
    </div>
  );
}

export default App;
