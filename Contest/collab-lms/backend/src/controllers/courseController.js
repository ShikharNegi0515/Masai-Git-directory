import Course from "../models/Course.js";
import Activity from "../models/Activity.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        const course = await Course.create({
            title,
            description,
            instructor: req.user._id,
            students: [],
        });

        await Activity.create({
            action: "Course created",
            actor: req.user.name,
            timestamp: new Date(),
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await course.deleteOne();

        await Activity.create({
            action: "Course deleted",
            actor: req.user.name,
            timestamp: new Date(),
        });

        res.json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.students.includes(req.user._id))
            return res.status(400).json({ message: "Already enrolled" });

        course.students.push(req.user._id);
        await course.save();

        await Activity.create({
            action: "Student enrolled",
            actor: req.user.name,
            timestamp: new Date(),
        });

        res.json({ message: "Enrolled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
