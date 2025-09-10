const mongoose = require("mongoose");
const validator = require("validator");

const PROFILE_NAMES = ["fb", "twitter", "github", "instagram"];

const profileSchema = new mongoose.Schema({
    profileName: {
        type: String, required: [true, "profileName is required"], enum: {
            values: PROFILE_NAMES,
            message: "profileName must be one of fb, twitter, github, instagram"
        }
    },
    url: {
        type: String,
        required: [true, "url is required"],
        validate: {
            validator: function (v) {
                return validator.isURL(v, { require_protocol: true });
            },
            message: props => `${props.value} is not a valid URL. Include http:// or https://`
        }
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: v => validator.isEmail(v),
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    profiles: {
        type: [profileSchema],
        default: []
    }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
module.exports.PROFILE_NAMES = PROFILE_NAMES;
