export const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

export const searchFilter = (posts, query, mode, users) => {
    if (!query) return posts;
    const q = query.toLowerCase();

    return posts.filter(p => {
        const author = users.find(u => u.id === p.userId)?.name || "";

        if (mode === "title")
            return p.title.toLowerCase().includes(q);

        if (mode === "fuzzy")
            return [...q].every(c => p.title.toLowerCase().includes(c));

        return (
            p.title.toLowerCase().includes(q) ||
            p.body.toLowerCase().includes(q) ||
            author.toLowerCase().includes(q)
        );
    });
};
