import Board from "../models/Board.js";
import User from "../models/User.js";

export const createBoard = async (req, res) => {
    const { title, columns } = req.body;
    const userId = req.user._id;

    try {
        const board = await Board.create({
            title,
            columns: columns.map(col => ({ name: col, tasks: [] })),
            createdBy: userId,
            members: [userId]
        });
        res.status(201).json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const inviteMember = async (req, res) => {
    const { boardId } = req.params;
    const { email } = req.body;

    try {
        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ message: "Board not found" });

        if (board.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only board creator can invite members" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!board.members.includes(user._id)) {
            board.members.push(user._id);
            await board.save();
        }

        res.json({ message: "User invited successfully", invitedUser: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({
            members: req.user._id
        }).populate("members", "username email");
        res.json(boards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ message: "Board not found" });

        if (board.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only board creator can delete" });
        }

        await board.deleteOne();
        res.json({ message: "Board deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
