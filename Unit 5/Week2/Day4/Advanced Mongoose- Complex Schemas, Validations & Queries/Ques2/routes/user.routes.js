const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user.controller");

// 1. Add user
router.post("/add-user", ctrl.addUser);

// 2. Add profile
router.post("/add-profile/:userId", ctrl.addProfile);

// 3. Get users (with optional ?profile=github)
router.get("/get-users", ctrl.getUsers);

// 4. Search
router.get("/search", ctrl.search);

// 5. Update profile
router.put("/update-profile/:userId/:profileName", ctrl.updateProfile);

// 6. Delete profile
router.delete("/delete-profile/:userId/:profileName", ctrl.deleteProfile);

module.exports = router;
