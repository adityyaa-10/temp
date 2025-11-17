import Employee from "./model.js";

// 1. Get all employees {GET}
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find(); // it will fetch all employees
        res.json({ success: true, data: employees })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// 2. Get each employee with id {GET}
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee does not exist" });
        }
        res.json({ success: true, data: employee })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// 3. Create new employee record {POST}
const createEmployee = async (req, res) => {
    try {
        const { name, department, dateOfJoining, employeeNumber } = req.body; // object destructuring in js
        const newEmployee = await Employee.create({ name, department, dateOfJoining, employeeNumber });
        res.status(201).json({ success: true, data: newEmployee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// 4. Update existing employee Record {PUT}
const updateEmployee = async (req, res) => {
    try {
        // findByIdAndUpdaye(id, req.body{new data}, options)
        const updated = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, error: "Employee does not exist" });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 5. Delete an employee record
const deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Employee does not exist" });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


export {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}