const User = require("../models/user.model");
const { PROFILE_NAMES } = require("../models/user.model");

function sanitizeUser(userDoc) {
    if (!userDoc) return null;
    const u = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
    delete u.password;
    return u;
}

// Route 1: POST /add-user
async function addUser(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(sanitizeUser(user));
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ message: "Email already exists" });
        }
        next(err);
    }
}

// Route 2: POST /add-profile/:userId
async function addProfile(req, res, next) {
    try {
        const { userId } = req.params;
        const { profileName, url } = req.body;

        if (!PROFILE_NAMES.includes(profileName)) {
            return res.status(400).json({ message: `profileName must be one of ${PROFILE_NAMES.join(", ")}` });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existing = user.profiles.find(p => p.profileName === profileName);
        if (existing) {
            return res.status(400).json({ message: `Profile ${profileName} already exists for this user` });
        }

        user.profiles.push({ profileName, url });
        await user.save(); 
        res.status(201).json(sanitizeUser(user));
    } catch (err) {
        next(err);
    }
}

// Route 3: GET /get-users
async function getUsers(req, res, next) {
    try {
        const { profile } = req.query;

        if (profile) {
            if (!PROFILE_NAMES.includes(profile)) {
                return res.status(400).json({ message: `Invalid profile filter. Must be one of ${PROFILE_NAMES.join(", ")}` });
            }
            const users = await User.find({ "profiles.profileName": profile }).select("-password");
            return res.json(users);
        }

        const users = await User.find().select("-password");
        return res.json(users);
    } catch (err) {
        next(err);
    }
}

// Route 4: GET /search?name=Alice&profile=fb
async function search(req, res, next) {
    try {
        const { name, profile } = req.query;
        if (!name) return res.status(400).json({ message: "name is required" });

        const user = await User.findOne({ name: new RegExp("^" + name + "$", "i") });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!profile) {
            return res.json({ message: "User found", user: sanitizeUser(user) });
        }

        if (!PROFILE_NAMES.includes(profile)) {
            return res.status(400).json({ message: `Invalid profile. Must be one of ${PROFILE_NAMES.join(", ")}` });
        }

        const profileObj = user.profiles.find(p => p.profileName === profile);
        if (profileObj) {
            return res.json({ profile: profileObj });
        } else {
            return res.json({
                message: "User found, but profile not found",
                user: sanitizeUser(user)
            });
        }
    } catch (err) {
        next(err);
    }
}

// Route 5: PUT /update-profile/:userId/:profileName
async function updateProfile(req, res, next) {
    try {
        const { userId, profileName } = req.params;
        const { url } = req.body;

        if (!PROFILE_NAMES.includes(profileName)) {
            return res.status(400).json({ message: `Invalid profileName. Must be one of ${PROFILE_NAMES.join(", ")}` });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const profile = user.profiles.find(p => p.profileName === profileName);
        if (!profile) return res.status(404).json({ message: "Profile not found for this user" });

        if (url) profile.url = url;

        await user.save(); 
        res.json(sanitizeUser(user));
    } catch (err) {
        next(err);
    }
}

// Route 6: DELETE /delete-profile/:userId/:profileName
async function deleteProfile(req, res, next) {
    try {
        const { userId, profileName } = req.params;

        if (!PROFILE_NAMES.includes(profileName)) {
            return res.status(400).json({ message: `Invalid profileName. Must be one of ${PROFILE_NAMES.join(", ")}` });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const idx = user.profiles.findIndex(p => p.profileName === profileName);
        if (idx === -1) return res.status(404).json({ message: "Profile not found for this user" });

        user.profiles.splice(idx, 1);
        await user.save();
        res.json(sanitizeUser(user));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addUser,
    addProfile,
    getUsers,
    search,
    updateProfile,
    deleteProfile
};
