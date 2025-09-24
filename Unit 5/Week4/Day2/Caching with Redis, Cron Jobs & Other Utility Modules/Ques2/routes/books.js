const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const redis = require('../redisClient');
const cron = require('node-cron');

// --- GET /books with caching ---
router.get('/', auth, async (req, res) => {
    const cacheKey = `books:${req.user._id}`;
    try {
        const cached = await redis.get(cacheKey);
        if (cached) return res.json(JSON.parse(cached));

        const books = await Book.find({ userId: req.user._id });
        await redis.set(cacheKey, JSON.stringify(books), 'EX', 120); 
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- POST /books ---
router.post('/', auth, async (req, res) => {
    try {
        const book = new Book({ ...req.body, userId: req.user._id });
        await book.save();
        await redis.del(`books:${req.user._id}`);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PUT /books/:id ---
router.put('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!book) return res.status(404).json({ message: 'Book not found' });
        await redis.del(`books:${req.user._id}`);
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- DELETE /books/:id ---
router.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        await redis.del(`books:${req.user._id}`);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- POST /books/bulk (store in Redis) ---
router.post('/bulk', auth, async (req, res) => {
    try {
        const bulkBooks = req.body.books;
        if (!Array.isArray(bulkBooks)) return res.status(400).json({ message: 'Books must be an array' });

        const redisKey = `bulk:${req.user._id}`;
        await redis.rpush(redisKey, JSON.stringify(bulkBooks));
        res.json({ message: 'Books will be added later' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

cron.schedule('*/2 * * * *', async () => {
    try {
        const keys = await redis.keys('bulk:*');
        for (const key of keys) {
            const userId = key.split(':')[1];
            const bulkBooksList = await redis.lrange(key, 0, -1);

            for (const booksStr of bulkBooksList) {
                const booksArray = JSON.parse(booksStr);
                const booksToInsert = booksArray.map(b => ({ ...b, userId }));
                await Book.insertMany(booksToInsert);
            }

            await redis.del(key);
            await redis.del(`books:${userId}`);
        }
        console.log('Bulk insertion job completed');
    } catch (err) {
        console.error('Bulk insertion job failed:', err);
    }
});

module.exports = router;
