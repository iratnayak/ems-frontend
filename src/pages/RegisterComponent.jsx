import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

// shadcn UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const RegisterComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('staff') 

    const navigator = useNavigate();

    function handleRegistrationForm(e){
        e.preventDefault();
        
        if(!username || !password){
            alert("Please fill all fields!");
            return;
        }

        const register = {username, password, role}

        registerAPICall(register).then((response) => {
            console.log(response.data);
            alert("Registration Successful!");
            navigator('/login');
        }).catch(error => console.error(error));
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Card className="w-[400px] shadow-xl border-slate-200">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-bold">Create Account</CardTitle>
                <CardDescription className="text-center">
                    Enter your details to create a new account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                
                {/* Username */}
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                        id="username" 
                        placeholder="Enter username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password"
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Role Selection (Styled Native Select) */}
                <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select 
                        id="role"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={handleRegistrationForm}>Register</Button>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <span 
                        className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={() => navigator('/login')}
                    >
                        Login
                    </span>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default RegisterComponent