"use client";
import { useState, useEffect } from "react";

const EmployeeForm = ({ initialData = null, onSubmit, submitText = "Submit" }) => {
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setDepartment(initialData.department || "");
            setDateOfJoining(initialData.dateOfJoining.slice(0, 10) || "");
            setEmployeeNumber(initialData.employeeNumber || "");
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            employeeNumber,
            name,
            department,
            dateOfJoining
        };

        try {
            await onSubmit(formData);
        } catch (err) {
            alert("Something went wrong")
        }
        console.log(formData);
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 border border-gray-600">
            <form
                className="w-full max-w-md bg-white border-gray-300 border rounded-lg p-8"
                onSubmit={handleSubmit}
            >
                <h2 className="mb-6 text-xl font-medium text-gray-600">Enter Employee Details</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-700 font-medium">Employee Number</label>
                    <input
                        type="text"
                        placeholder="Enter Employee Number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        value={employeeNumber}
                        onChange={(e) => setEmployeeNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-700 font-medium">Name</label>
                    <input
                        type="text"
                        placeholder="Enter Employee Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-700 font-medium">Department</label>
                    <input
                        type="text"
                        placeholder="Enter Department"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-700 font-medium">Date of Joining</label>
                    <input
                        type="date"
                        placeholder="Enter Date of Joining"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        value={dateOfJoining}
                        onChange={(e) => setDateOfJoining(e.target.value)}
                    />
                </div>

                <button type="submit" className="cursor-pointer w-full px-5 py-2 bg-blue-400 text-white text-sm rounded-lg">
                    {submitText}
                </button>
            </form>

        </div>
    )
}

export default EmployeeForm