import React from "react";

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
