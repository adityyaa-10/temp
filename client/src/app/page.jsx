"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setError(null)
    const res = await axios.get("http://localhost:8000/api/employees/all");
    console.log(res);
    setEmployees(res.data.data);

    const success = res.data.success;
    if (!success) {
      setError(res?.data?.error || "Something went wrong")
    }
  }
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = confirm("Are you sure you want to delete this Employee Record");
    if (!confirmation)
      return;

    try {
      await axios.delete(`http://localhost:8000/api/employees/delete/${id}`);
      alert("Employee deleted successfully!");

      // Refresh employee list after deletion
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee.");
    }
  }

  return (
    <div className="mx-24 my-16">
      <header className="flex justify-between mb-8">
        <h1 className="font-medium text-2xl">Employee Record</h1>
        <Link
          href={'/create'}
          className="bg-green-400 text-white px-4 py-2 rounded-md font-medium">Add</Link>
      </header>

      {error && <p className="text-red-500 text-lg font-medium">{error}</p>}

      <div className="">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-200">
            <tr>
              <th className="py-4 px-6 text-left font-medium">Employee Number</th>
              <th className="py-4 px-6 text-left font-medium">Name</th>
              <th className="py-4 px-6 text-left font-medium">Department</th>
              <th className="py-4 px-6 text-left font-medium">Date of Joining</th>
              <th className="py-4 px-6 text-left font-medium">Options</th>
            </tr>
          </thead>


          <tbody className="divide-y">
            {employees.map((emp) => (
              < tr key={emp._id} >
                <td className="px-6 py-4 text-sm text-gray-600">{emp.employeeNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.dateOfJoining.slice(0, 10)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <Link
                    href={`/${emp._id}/edit`}
                    className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-sm mr-3 cursor-pointer">Edit</Link>
                  <button
                    onClick={() => handleDelete(emp._id)} // onClick syntax --> onClick{()=> fun};
                    className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-sm cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!error && employees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>


        </table>
      </div>
    </div >
  );
}
