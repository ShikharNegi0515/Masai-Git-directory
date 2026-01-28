const BASE = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page, limit) => {
    const res = await fetch(`${BASE}/posts?_page=${page}&_limit=${limit}`);
    if (!res.ok) throw new Error("Failed to load posts");
    return res.json();
};

export const fetchUsers = async () => {
    const res = await fetch(`${BASE}/users`);
    return res.json();
};

export const fetchComments = async () => {
    const res = await fetch(`${BASE}/comments`);
    return res.json();
};

export const fetchPostDetails = async (postId) => {
    const [post, comments] = await Promise.all([
        fetch(`${BASE}/posts/${postId}`).then(r => r.json()),
        fetch(`${BASE}/comments?postId=${postId}`).then(r => r.json())
    ]);
    return { post, comments };
};
