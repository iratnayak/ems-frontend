import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

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

const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate();

    async function handleLoginForm(e){
        e.preventDefault();
        await loginAPICall(username, password).then((response) => {
            const token = "Bearer " + response.data.token;
            const role = response.data.role;
            storeToken(token);
            saveLoggedInUser(username, role);
            navigator('/employees');
            window.location.reload(false);
        }).catch(error => {
            console.error(error);
            alert("Invalid Credentials!");
        });
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Card className="w-[400px] shadow-xl border-slate-200">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-bold">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Input 
                        id="username" 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Input 
                        id="password" 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-orange-200" onClick={handleLoginForm}>Login</Button>
                <Button variant="outline" className="w-full bg-blue-200" onClick={() => navigator('/register')}>
                    Create an account
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default LoginComponent