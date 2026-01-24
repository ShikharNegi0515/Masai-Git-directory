const BASE_URL = "https://jsonplaceholder.typicode.com";


export const fetchPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`)
    if (!res.ok) throw new Error("Failed to fetch posts")
    return res.json()
}

export const fetchUser = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`)
    if (!res.ok) throw new Error("Failed to fetch user")
    return res.json()
}

export const fetchComments = async (postId) => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`)
    if (!res.ok) throw new Error("Failed to fetch comments")
    return res.json()
}
