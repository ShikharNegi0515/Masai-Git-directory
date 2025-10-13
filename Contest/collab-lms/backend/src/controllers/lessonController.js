import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";
import Activity from "../models/Activity.js";

export const addLesson = async (req, res) => {
    try {
        const { title, description, videoUrl } = req.body;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        const lesson = await Lesson.create({
            title,
            description,
            videoUrl,
            course: courseId,
        });

        await Activity.create({
            action: `Lesson added in ${course.title}`,
            actor: req.user.name,
            timestamp: new Date(),
        });

        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markComplete = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.lessonId);
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        if (!lesson.completedBy.includes(req.user._id)) {
            lesson.completedBy.push(req.user._id);
            await lesson.save();
        }

        res.json({ message: "Lesson marked as completed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({ course: req.params.courseId });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
