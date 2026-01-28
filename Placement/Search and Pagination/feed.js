import { state } from "./state.js";
import { applyTransformers } from "./transformers.js";
import { searchFilter } from "./search.js";
import { openDetail } from "./detail.js";

const feed = document.getElementById("feed");

export const renderFeed = () => {
    let result = [...state.posts];

    result = searchFilter(result, state.search, state.searchMode, state.users);
    result = applyTransformers(result, state.transformers);

    feed.innerHTML = "";

    if (!result.length) {
        feed.innerHTML = "<p>No posts found</p>";
        return;
    }

    result.forEach(post => {
        const div = document.createElement("div");
        div.className = `post ${post.highlight ? "highlight" : ""}`;
        div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body.slice(0, 120)}...</p>
    `;
        div.onclick = () => openDetail(post.id);
        feed.appendChild(div);
    });

    document.getElementById("page").textContent = state.page;
};
