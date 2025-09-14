const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!course) return res.status(404).json({ message: "Course not found" });

        await Enrollment.updateMany({ courseId: req.params.id }, { isActive: false });

        res.json({ message: "Course deactivated and enrollments updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseStudents = async (req, res) => {
    try {
        const students = await Enrollment.find({
            courseId: req.params.id,
            isActive: true
        }).populate("studentId");

        res.json(students.map(e => e.studentId));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
