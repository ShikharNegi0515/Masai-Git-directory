import Activity from "../models/Activity.js";
import Comment from "../models/Comment.js";

/**
 * @param {Server} io - The initialized Socket.IO server instance
 */
export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);


    socket.on("joinCourse", (courseId) => {
      socket.join(courseId);
      console.log(`📚 User joined course: ${courseId}`);
    });


    socket.on("leaveCourse", (courseId) => {
      socket.leave(courseId);
      console.log(`🚪 User left course: ${courseId}`);
    });


    socket.on("lessonAdded", async ({ courseId, lesson }) => {
      io.to(courseId).emit("lessonUpdated", { type: "added", lesson });

      await Activity.create({
        action: `Lesson "${lesson.title}" added`,
        actor: lesson.instructorName || "Instructor",
      });
    });


    socket.on("lessonModified", async ({ courseId, action, details }) => {
      io.to(courseId).emit("lessonUpdated", { type: action, details });

      await Activity.create({
        action: `Lesson ${action}: ${details}`,
        actor: "Instructor",
      });
    });


    socket.on("newComment", async ({ courseId, lessonId, user, message }) => {
      const comment = await Comment.create({ lessonId, user, message });

      io.to(courseId).emit("commentAdded", {
        user,
        message,
        timestamp: comment.createdAt,
      });

      await Activity.create({
        action: `Comment added by ${user}`,
        actor: user,
      });
    });


    socket.on("deleteComment", async ({ courseId, commentId, user }) => {
      await Comment.findByIdAndDelete(commentId);
      io.to(courseId).emit("commentDeleted", commentId);

      await Activity.create({
        action: `Comment deleted by ${user}`,
        actor: user,
      });
    });


    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
};
