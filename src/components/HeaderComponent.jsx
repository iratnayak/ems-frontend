import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout, getLoggedInUserRole } from '../services/AuthService'
import { Button } from "@/components/ui/button" 

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();
    const role = getLoggedInUserRole(); 
    const navigator = useNavigate();

    function handleLogout(){
        logout();
        navigator('/login');
    }

  return (
    <header className="bg-slate-900 text-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            {/* Logo / Brand Name */}
            <a href="http://localhost:3000" className="text-xl font-bold tracking-wide hover:text-gray-300">
                Employee Management System
            </a>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
                {
                    isAuth && 
                    <>
                        {/* Role Display */}
                        <span className="text-sm text-yellow-500 uppercase font-bold">
                            {role}
                        </span>
                    </>
                }

                {/* Login / Register / Logout Buttons */}
                <div className="flex items-center gap-4">
                    {
                        isAuth && 
                        <Button 
                            variant="destructive" 
                            className="text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700"
                            size="sm" 
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    }
                </div>
            </div>
        </nav>
    </header>
  )
}

export default HeaderComponent