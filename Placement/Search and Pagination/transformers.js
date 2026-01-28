export const highlightLongPosts = (min) => posts =>
    posts.map(p => ({
        ...p,
        highlight: p.body.length > min
    }));

export const sortByComments = (commentsMap) => posts =>
    [...posts].sort(
        (a, b) => (commentsMap[b.id] || 0) - (commentsMap[a.id] || 0)
    );

export const applyTransformers = (posts, transformers) =>
    transformers.reduce((acc, fn) => fn(acc), posts);
