import { fetchPosts, fetchUsers, fetchComments } from "./api.js";
import { state } from "./state.js";
import { renderFeed } from "./feed.js";
import { debounce } from "./search.js";
import { highlightLongPosts, sortByComments } from "./transformers.js";

const searchInput = document.getElementById("searchInput");
const searchMode = document.getElementById("searchMode");

const loadInitial = async () => {
    state.users = await fetchUsers();
    const comments = await fetchComments();

    comments.forEach(c => {
        state.commentsMap[c.postId] = (state.commentsMap[c.postId] || 0) + 1;
    });

    await loadPage(1);
};

const loadPage = async (page) => {
    state.page = page;
    state.posts = await fetchPosts(page, state.limit);
    renderFeed();
};

searchInput.addEventListener("input",
    debounce(e => {
        state.search = e.target.value;
        renderFeed();
    }, 400)
);

searchMode.addEventListener("change", e => {
    state.searchMode = e.target.value;
    renderFeed();
});

document.getElementById("highlightBtn").onclick = () => {
    state.transformers.push(highlightLongPosts(120));
    renderFeed();
};

document.getElementById("sortBtn").onclick = () => {
    state.transformers.push(sortByComments(state.commentsMap));
    renderFeed();
};

document.getElementById("prev").onclick = () =>
    loadPage(Math.max(1, state.page - 1));

document.getElementById("next").onclick = () =>
    loadPage(state.page + 1);

loadInitial();
