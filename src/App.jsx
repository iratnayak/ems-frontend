import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

// Form Fields
  const [name, setName] = useState("");
  const [basic, setBasic] = useState("");
  const [otHours, setOtHours] = useState("");
  const [otRate, setOtRate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

// Load employees from API
  const loadData = () => {
    fetch("http://localhost:5001/employees")
    .then((res) => res.json())
    .then((data) => setEmployees(data))
    .catch((err) => console.error("API Error! ", err))
  }
  useEffect(() => {
    loadData();

  }, []);
// Add Employee
  const addEmployee = () => {
    if (!name || !basic || !otHours || !otRate){
      alert("Please Fill all fields");
      return;
    }
    const basicNum = parseFloat(basic);
    const otHoursNum = parseFloat(otHours);
    const otRateNum = parseFloat(otRate);

    const otAmount = otHoursNum * otRateNum;
    const fullSalary = basicNum + otAmount;

    const newEmp = {
      name,
      basic: basicNum,
      otAmount,
      fullSalary,
    };

    fetch("http://localhost:5001/employees", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newEmp),
    })
    .then((res) => res.json())
    .then(() => {
      loadData(); //Refresh Table
      //Clear Form
      setName("");
      setBasic("");
      setOtHours("");
      setOtRate("");
    })
    .catch((err) => console.error("Add Error! ", err));
  }
// Edit Employee Details
  const startEdit = (emp, index) => {
    setName(emp.name);
    setBasic(emp.basic);
    setOtHours(emp.otHours);
    setOtRate(emp.otRate);
    setIsEdit(true);
    setEditIndex(index);
  };

  const updateEmployee = () => {
    const basicNum = parseFloat(basic);
    const otHoursNum = parseFloat(otHours);
    const otRateNum = parseFloat(otRate);

    const otAmount = otHoursNum * otRateNum;
    const fullSalary = otAmount + basic;

    const updatedEmp = {
      name,
      basic: basicNum,
      otHours: otHoursNum,
      otRate: otRateNum,
      otAmount,
      fullSalary,
    };

    fetch(`http://localhost:5001/employees/${editIndex}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedEmp),
    })
    .then((res) => res.json())
    .then(() => {
      loadData();
      cancelEdit();
    })
    .catch((err) => console.error("Update Error!", err));
  };

// Cancel Edit Employee Details
  const cancelEdit = () => {
    setIsEdit(false);
    setEditIndex(null);
    setName("");
    setBasic("");
    setOtHours("");
    setOtRate("");
  };

  // Delete Employee
  const deleteEmployee = (index) => {
    fetch(`http://localhost:5001/employees/${index}`,{
      method: "DELETE", 
    })
    .then((res) => res.json())
    .then(() => loadData())
    .catch((err) => console.error("Delete Error:", err));

  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        background: "#222",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        Employee Management System (Frontend + API)
      </h1>

      {/* Add Employee Form */}
      <div style={{ marginBottom: "25px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <input
          placeholder="Basic"
          value={basic}
          onChange={(e) => setBasic(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <input
          placeholder="OT Hours"
          value={otHours}
          onChange={(e) => setOtHours(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <input
          placeholder="OT Rate"
          value={otRate}
          onChange={(e) => setOtRate(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        {isEdit ? (
          <>
            <button onClick={updateEmployee}>Update</button>
            <button onClick={cancelEdit} style={{ marginLeft: "8px" }}>Cancel</button>
          </>
             ) : (
            <button onClick={addEmployee}>Add Employee</button>
             )}
      </div>

      {/* Employee Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Basic</th>
            <th>OT</th>
            <th>Full Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.basic}</td>
              <td>{e.otAmount}</td>
              <td>{e.fullSalary}</td>
              <td>
                <button onClick={() => startEdit(e, index)}>Edit</button>
                <button onClick={() => deleteEmployee(index)} style={{ marginLeft: "8px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );}
export default App;
