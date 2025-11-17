"use client";

import axios from 'axios';
import EmployeeForm from '@/components/EmployeeForm'


const CreateEmployeePage = () => {
    const handleSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/employees/create", data);
            console.log(res.data);
            alert("Employee Created Successfully")
        } catch (err) {
            alert("Something Went Wrong");
        }
    }
    return (
        <div>
            <EmployeeForm
                onSubmit={handleSubmit}
                submitText='Submit'
            />
        </div>
    )
}

export default CreateEmployeePage