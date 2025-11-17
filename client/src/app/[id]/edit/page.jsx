"use client";
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EmployeeForm from '@/components/EmployeeForm';
import axios from 'axios';

const EditEmployeePage = () => {
    const params = useParams();
    const { id } = params;
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setError(null)
                const res = await axios.get(`http://localhost:8000/api/employees/${id}`)
                setInitialData(res.data.data);
            } catch (err) {
                setError(err || "Something went wrong");
            }
        }
        fetchEmployee();
    }, [id]);

    const handleUpdate = async (data) => {
        try {
            await axios.put(`http://localhost:8000/api/employees/edit/${id}`, data)
            alert("Employee record updated successfully");
        } catch (err) {
            alert("Something went wrong")
        }
    }

    if (error) return <div className='text-red-500 font-medium text-xl'>{error}</div>
    return (
        <div>
            <EmployeeForm
                initialData={initialData}
                onSubmit={handleUpdate}
                submitText="Update"
            />
        </div>
    )
}

export default EditEmployeePage