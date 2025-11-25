import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

// shadcn UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const EmployeeComponent = () => {
    const [name, setName] = useState('')
    const [basic, setBasic] = useState('')
    const [otHours, setOtHours] = useState('')
    const [otRate, setOtRate] = useState('')

    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setName(response.data.name);
                setBasic(response.data.basic);
                setOtHours(response.data.otHours);
                setOtRate(response.data.otRate);
            }).catch(error => console.error(error));
        }
    }, [id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        // Simple Validation
        if(!name || !basic) {
            alert("Name and Basic Salary are required!");
            return;
        }

        const employee = {name, basic, otHours, otRate}

        if(id){
            updateEmployee(id, employee).then(() => {
                navigator('/employees');
            }).catch(error => console.error(error));
        } else {
            createEmployee(employee).then(() => {
                navigator('/employees');
            }).catch(error => console.error(error));
        }
    }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
        <Card className="w-[500px] shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl text-center font-bold text-slate-800">
                    {id ? 'Update Employee Details' : 'Add New Employee'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4">
                    
                    {/* Name Input */}
                    <div className="grid gap-2">
                        <Input 
                            id="name" 
                            placeholder="Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Basic Salary */}
                    <div className="grid gap-2">
                        <Input 
                            id="basic" 
                            type="number" 
                            placeholder="Basic Salary" 
                            value={basic}
                            onChange={(e) => setBasic(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* OT Hours */}
                        <div className="grid gap-2">
                            <Input 
                                id="otHours" 
                                type="number" 
                                placeholder="OT Hours" 
                                value={otHours}
                                onChange={(e) => setOtHours(e.target.value)}
                            />
                        </div>

                        {/* OT Rate */}
                        <div className="grid gap-2">
                            <Input 
                                id="otRate" 
                                type="number" 
                                placeholder="OT Rate (Hourly)" 
                                value={otRate}
                                onChange={(e) => setOtRate(e.target.value)}
                            />
                        </div>
                    </div>

                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="bg-red-200" variant="outline" onClick={() => navigator('/employees')}>
                    Cancel
                </Button>
                <Button onClick={saveOrUpdateEmployee} className="bg-green-200">
                    {id ? 'Update Changes' : 'Save Employee'}
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default EmployeeComponent