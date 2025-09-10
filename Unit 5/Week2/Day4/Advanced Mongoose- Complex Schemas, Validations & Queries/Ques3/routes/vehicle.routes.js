const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/vehicle.controller");

// Vehicle CRUD
router.post("/vehicles", ctrl.createVehicle);
router.get("/vehicles", ctrl.getVehicles);
router.put("/vehicles/:id", ctrl.updateVehicle);
router.delete("/vehicles/:id", ctrl.deleteVehicle);

// Trip operations
router.post("/vehicles/:id/trips", ctrl.addTrip);
router.put("/vehicles/:id/trips/:tripId", ctrl.updateTrip);
router.delete("/vehicles/:id/trips/:tripId", ctrl.deleteTrip);

// Queries
router.get("/queries/long-trips", ctrl.getVehiclesWithLongTrips);
router.get("/queries/from-cities", ctrl.getVehiclesFromCities);
router.get("/queries/after-date", ctrl.getVehiclesAfterDate);
router.get("/queries/cars-trucks", ctrl.getCarsAndTrucks);

module.exports = router;
