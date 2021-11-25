import "./App.css";
import { Table, Button } from "react-bootstrap";
import React, { useState, useRef } from "react";

function App() {
  const teamList = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@joker.com",
      phone: "9999999999",
    },
    {
      firstName: "Dvid",
      lastName: "Sampleton",
      email: "d.sampleton@dream.com",
      phone: "9999999992",
    },
    {
      firstName: "Jane",
      lastName: "White",
      email: "jwhite@gmail.com",
      phone: "9999999991",
    },
  ];
  const [data, setData] = useState(teamList);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState("");

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const uniqueFName = (name) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].firstName === name) {
        return false;
      }
    }
    return true;
  };
  const handleOnSave = () => {
    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const mail = emailRef.current.value;
    const num = phoneRef.current.value;
    // console.log(fName, lName, mail, num);
    const validFName = /[a-zA-Z]/.test(fName) && fName.length < 256;
    const validLName = /[a-zA-Z]/.test(lName) && lName.length < 256;
    const validEmail =
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail) && mail.length < 256;
    const validNum = /[0-9]/.test(num) && num.length === 10;
    console.log(validFName, validLName, validEmail, validNum);
    const isFNameUnique = uniqueFName(fName);
    // console.log("sssss", isFNameUnique);
    if (
      //regular expressions for input validation
      validFName &&
      validLName &&
      validEmail &&
      isFNameUnique
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

  const handleOnDelete = (name) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const newList = data.filter((item) => item.firstName !== name);

      setData(newList);
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
              <tr>
                <td>
                  {editForm === item.email ? (
                    <input
                      name="fName"
                      type="text"
                      ref={fNameRef}
                      onBlur={uniqueFName}
                      placeholder={item.firstName}
                      required="required"
                    />
                  ) : (
                    item.firstName
                  )}
                </td>
                <td>
                  {editForm === item.email ? (
                    <input
                      name="lName"
                      type="text"
                      ref={lNameRef}
                      placeholder={item.lastName}
                      required="required"
                    />
                  ) : (
                    item.lastName
                  )}
                </td>
                <td>
                  {editForm === item.email ? (
                    <input
                      name="email"
                      type="email"
                      ref={emailRef}
                      placeholder={item.email}
                      required="required"
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td>
                  {editForm === item.email ? (
                    <input
                      name="phone"
                      ref={phoneRef}
                      placeholder={item.phone}
                    />
                  ) : (
                    item.phone
                  )}
                </td>
                <td>
                  {editForm === item.email ? (
                    <Button onClick={handleOnSave}>Save</Button>
                  ) : (
                    <Button onClick={() => setEditForm(item.email)}>
                      Edit
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleOnDelete(item.email)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
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
      <Button className="save-button" variant="warning" onClick={handleOnSave}>
        Save Changes
      </Button>
    </div>
  );
}

export default App;
