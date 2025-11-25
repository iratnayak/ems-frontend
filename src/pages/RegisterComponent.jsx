import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const RegisterComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('staff') // Default staff

    const navigator = useNavigate();

    function handleRegistrationForm(e){
        e.preventDefault();
        const register = {username, password, role}

        registerAPICall(register).then((response) => {
            console.log(response.data);
            alert("Registration Successful!");
            navigator('/login');
        }).catch(error => console.error(error));
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Register Form</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Username:</label>
                            <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} className='form-control'/>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Password:</label>
                            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control'/>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Role:</label>
                            <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button className='btn btn-primary' onClick={handleRegistrationForm}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterComponent