import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    city: "",
  });
  const [searchCity, setSearchCity] = useState("");
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const initialData = [
      { id: 1, firstName: "Pankaj", lastName: "Mandal", city: "Bangalore" },
      { id: 2, firstName: "Jane", lastName: "Smith", city: "Los Angeles" },
      { id: 3, firstName: "Bob", lastName: "Johnson", city: "Chicago" },
      {
        id: 4,
        firstName: "Alice",
        lastName: "Williams",
        city: "San Francisco",
      },
      { id: 5, firstName: "Charlie", lastName: "Brown", city: "Seattle" },
    ];

    setEmployees(initialData);
    setNextId(initialData.length + 1);
    updateLocalStorage(initialData);
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem("employees", JSON.stringify(data));
  };

  const addEmployee = () => {
    const updatedEmployees = [...employees, { ...newEmployee, id: nextId }];
    setEmployees(updatedEmployees);
    updateLocalStorage(updatedEmployees);
    setNewEmployee({ id: "", firstName: "", lastName: "", city: "" });
    setNextId(nextId + 1);
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    updateLocalStorage(updatedEmployees);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="container">
      <h2>CRUD Operation Using React js with Local DB</h2>
      <div
        className="label-input-group"
        style={{ textAlign: "left", marginLeft: 140 }}
      >
        <input
          type="text"
          style={{ border: "1px solid", borderRadius: "5px" }}
          placeholder="Search here"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.city}</td>
                <td>
                  <button
                    style={{ borderRadius: 5 }}
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <p />
              </td>
              <td>
                <input
                  type="text"
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      firstName: e.target.value,
                    })
                  }
                  style={{ border: "none", outline: "none" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      lastName: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  value={newEmployee.city}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, city: e.target.value })
                  }
                />
              </td>
              <td>
                <button
                  type="tablebutton"
                  style={{ backgroundColor: "green", borderRadius: 5 }}
                  onClick={addEmployee}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
