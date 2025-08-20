import React from "react";

// React.memo is used here to prevent unnecessary re-renders of RepoCard
// A RepoCard only needs to re-render if its props (repo data) change.
// This improves performance when the parent re-renders for unrelated reasons.
const RepoCard = React.memo(({ name, description, stars, forks }) => {
  return (
    <div className="repo-card">
      <h3>{name}</h3>
      <p>{description || "No description available."}</p>
      <div className="repo-stats">
        ⭐ {stars} | 🍴 {forks}
      </div>
    </div>
  );
});

export default RepoCard;
