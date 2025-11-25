/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUserRole } from '../services/AuthService'

// shadcn UI Components
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([])
    const isAdmin = getLoggedInUserRole() === 'admin';
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => console.error(error));
    }

    function removeEmployee(id) {
        deleteEmployee(id).then(() => {
            getAllEmployees();
        }).catch(error => console.error(error));
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    return (
        <div className='container mx-auto py-10'>
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Employees List</CardTitle>
                    {
                        isAdmin && 
                        <Button onClick={() => navigator('/add-employee')} className="bg-blue-200">
                            + Add Employee
                        </Button>
                    }
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Basic Salary</TableHead>
                                    <TableHead>OT Amount</TableHead>
                                    <TableHead className="text-right">Full Salary</TableHead>
                                    { isAdmin && <TableHead className="text-center">Actions</TableHead> }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee._id}>
                                        <TableCell className="font-medium">{employee.name}</TableCell>
                                        <TableCell>{employee.basic}</TableCell>
                                        <TableCell>{employee.otAmount}</TableCell>
                                        <TableCell className="text-right font-bold text-green-600">
                                            {employee.fullSalary}
                                        </TableCell>
                                        
                                        {isAdmin && (
                                            <TableCell className="text-center space-x-2">
                                                <Button
                                                    variant="outline" 
                                                    className="bg-green-200"
                                                    size="sm" 
                                                    onClick={() => updateEmployee(employee._id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    variant="destructive" 
                                                    className="bg-red-200"
                                                    size="sm" 
                                                    onClick={() => removeEmployee(employee._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ListEmployeeComponent