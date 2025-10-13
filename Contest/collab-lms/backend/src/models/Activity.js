import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
    },
    actor: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Activity", activitySchema);
