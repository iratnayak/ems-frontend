import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  // State
  const [name, setName] = useState("");
  const [basic, setBasic] = useState("");
  const [otHours, setOtHours] = useState("");
  const [otRate, setOtRate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Login state
  const [role, setRole] = useState(null); // "admin" | "staff" | null
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Login
  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setRole("admin");
      setLoginError("");
    } else if (username === "staff" && password === "staff123") {
      setRole("staff");
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Load employees from API
  const loadData = () => {
    fetch("http://localhost:5001/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("API Error! ", err));
  };

  useEffect(() => {
    loadData();
  }, []);

 // Add Employee
  const addEmployee = () => {
    if (!name || !basic || !otHours || !otRate) {
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
      otHours: otHoursNum,
      otRate: otRateNum,
      otAmount,
      fullSalary,
    };

    fetch("http://localhost:5001/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmp),
    })
      .then((res) => res.json())
      .then(() => {
        loadData(); // Refresh Table
        // Clear Form
        setName("");
        setBasic("");
        setOtHours("");
        setOtRate("");
      })
      .catch((err) => console.error("Add Error! ", err));
  };

  // Edit Employee Details (form prefill)
const startEdit = (emp, index) => {
  setName(emp.name);
  setBasic(emp.basic);
  setOtHours(emp.otHours);
  setOtRate(emp.otRate);
  setIsEdit(true);
  setEditIndex(index);
};

const updateEmployee = () => {
  if (!name || !basic || !otHours || !otRate) {
    alert("Please Fill all fields");
    return;
  }

  const basicNum = parseFloat(basic);
  const otHoursNum = parseFloat(otHours);
  const otRateNum = parseFloat(otRate);

  const otAmount = otHoursNum * otRateNum;
  const fullSalary = basicNum + otAmount;

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
    headers: { "Content-Type": "application/json" },
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

  // Delete Employee Details
  const deleteEmployee = (index) => {
    fetch(`http://localhost:5001/employees/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => loadData())
      .catch((err) => console.error("Delete Error:", err));
  };

  // Search Employee Details
  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // LOGIN SCREEN
    if (!role) {
      return (
        <div
          style={{
            padding: "230px",
            fontFamily: "sans-serif",
            background: "#222",
            minHeight: "100vh",
            color: "white",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>
            Employee Management System – Login
          </h1>
          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="Username (admin / staff)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginRight: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginRight: "8px" }}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {loginError && (
            <div style={{ marginTop: "10px", color: "red" }}>{loginError}</div>
          )}
          <div style={{ marginTop: "20px", fontSize: "14px", opacity: 0.7 }}>
            Demo: admin/admin123 or staff/staff123
          </div>
        </div>
      );
    }
  
  return (
    <div
      style={{
        padding: "130px",
        fontFamily: "sans-serif",
        background: "#222",
        minHeight: "200vh",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        Employee Management System (Frontend + API)
      </h1>

      <div style={{ marginBottom: "10px", fontSize: "14px" }}>
        Logged in as <strong>{role}</strong>{" "}
        {role === "admin" ? "(full access)" : "(view only)"}
      </div>
      
      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search by Employee Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "250px", marginRight: "10px" }}
        />
      </div>

      {/* Add / Edit Employee Form (admin only) */}
      {role === "admin" && (
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
              <button onClick={cancelEdit} style={{ marginLeft: "8px" }}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={addEmployee}>Add Employee</button>
          )}
        </div>
      )}

      {/* Employee Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Basic</th>
            <th>OT</th>
            <th>Full Salary</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.basic}</td>
              <td>{e.otAmount}</td>
              <td>{e.fullSalary}</td>
              {role === "admin" && (
                <td>
                  <button onClick={() => startEdit(e, index)}>Edit</button>
                  <button
                    onClick={() => deleteEmployee(index)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;