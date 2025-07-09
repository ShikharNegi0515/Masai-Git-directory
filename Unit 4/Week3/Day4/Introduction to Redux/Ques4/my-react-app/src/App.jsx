import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "./redux/match/matchActions";
import MatchCard from "./components/MatchCard";

function App() {
  const dispatch = useDispatch();
  const { footballMatches, isLoading, isError } = useSelector((state) => state.match);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error fetching matches</h2>;

  return (
    <div>
      <h1>Football Matches</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {footballMatches.map((match, i) => (
          <MatchCard key={i} match={match} />
        ))}
      </div>
    </div>
  );
}

export default App;
