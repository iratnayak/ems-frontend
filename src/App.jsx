import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/employees")
    .then((res) => res.json())
    .then((data) => setEmployees(data))
    .catch((err) => console.error("API Error! ", err))
  }, []);
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Employee Management System (Frontend + API)</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Basic</th>
            <th>OT</th>
            <th>Full Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.basic}</td>
              <td>{e.otAmount}</td>
              <td>{e.fullSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

export default App;
