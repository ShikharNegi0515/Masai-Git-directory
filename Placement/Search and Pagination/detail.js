import { fetchPostDetails } from "./api.js";
import { state } from "./state.js";

const modal = document.getElementById("modal");

export const openDetail = async (postId) => {
    modal.classList.remove("hidden");
    modal.innerHTML = "<div>Loading...</div>";

    const { post, comments } = await fetchPostDetails(postId);
    const user = state.users.find(u => u.id === post.userId);

    modal.innerHTML = `
    <div>
      <button onclick="document.getElementById('modal').classList.add('hidden')">
        Close
      </button>
      <h2>${post.title}</h2>
      <p><b>${user.name}</b></p>
      <p>${post.body}</p>
      <h4>Comments (${comments.length})</h4>
      ${comments.map(c => `<p>${c.body}</p>`).join("")}
    </div>
  `;
};
