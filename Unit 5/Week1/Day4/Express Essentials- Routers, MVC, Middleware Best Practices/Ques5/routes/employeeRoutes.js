const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");
const roleCheck = require("../middlewares/roleCheckMiddleware");

// GET all employees → (admin, hr)
router.get("/", roleCheck(["admin", "hr"]), controller.getEmployees);

// POST add employee → (admin only)
router.post("/", roleCheck(["admin"]), controller.addEmployee);

// PUT update employee → (admin, hr)
router.put("/:id", roleCheck(["admin", "hr"]), controller.updateEmployee);

// DELETE employee → (admin only)
router.delete("/:id", roleCheck(["admin"]), controller.deleteEmployee);

module.exports = router;
