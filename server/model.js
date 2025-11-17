import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // employee name is mandatory
    },
    department: {
        type: String,
        required: true, // department is mandatory
    },
    dateOfJoining: {
        type: Date,
        required: true, // date is mandatory
    },
    employeeNumber: {
        type: Number,
        required: true,
        unique: true, // no 2 employees can have same number
    }
});

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee;





