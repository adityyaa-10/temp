import express from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "./controller.js"


const router = express.Router(); // instantiate express router

router.get("/all", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/create", createEmployee);
router.put("/edit/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;