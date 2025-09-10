const Vehicle = require("../models/vehicle.model");

// ---------- VEHICLE CRUD ----------

// Create vehicle
async function createVehicle(req, res, next) {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: "Registration number already exists" });
        next(err);
    }
}

// Get all vehicles
async function getVehicles(req, res, next) {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
}

// Update vehicle
async function updateVehicle(req, res, next) {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json(vehicle);
    } catch (err) {
        next(err);
    }
}

// Delete vehicle
async function deleteVehicle(req, res, next) {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json({ message: "Vehicle deleted" });
    } catch (err) {
        next(err);
    }
}

// ---------- TRIP OPERATIONS ----------

// Add trip
async function addTrip(req, res, next) {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        vehicle.trips.push(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (err) {
        next(err);
    }
}

// Update trip by tripId
async function updateTrip(req, res, next) {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        const trip = vehicle.trips.id(req.params.tripId);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        Object.assign(trip, req.body);
        await vehicle.save();
        res.json(vehicle);
    } catch (err) {
        next(err);
    }
}

// Delete trip
async function deleteTrip(req, res, next) {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        const trip = vehicle.trips.id(req.params.tripId);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        trip.deleteOne();
        await vehicle.save();
        res.json(vehicle);
    } catch (err) {
        next(err);
    }
}

// ---------- ADVANCED QUERIES ----------

// A. Vehicles with a trip longer than 200 km
async function getVehiclesWithLongTrips(req, res, next) {
    try {
        const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
}

// B. Vehicles with trips starting from Delhi, Mumbai, or Bangalore
async function getVehiclesFromCities(req, res, next) {
    try {
        const vehicles = await Vehicle.find({
            "trips.startLocation": { $in: ["Delhi", "Mumbai", "Bangalore"] }
        });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
}

// C. Vehicles with trips starting after Jan 1, 2024
async function getVehiclesAfterDate(req, res, next) {
    try {
        const vehicles = await Vehicle.find({
            "trips.startTime": { $gte: new Date("2024-01-01") }
        });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
}

// D. Find all cars or trucks
async function getCarsAndTrucks(req, res, next) {
    try {
        const vehicles = await Vehicle.find({ type: { $in: ["car", "truck"] } });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
    addTrip,
    updateTrip,
    deleteTrip,
    getVehiclesWithLongTrips,
    getVehiclesFromCities,
    getVehiclesAfterDate,
    getCarsAndTrucks
};
