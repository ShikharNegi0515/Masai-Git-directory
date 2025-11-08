import AnimatedBanner from "./AnimatedBanner";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <AnimatedBanner
        texts={["Create.", "Learn.", "Grow."]}
        typingSpeed={100}
        erasingSpeed={50}
        delayBeforeErase={1000}
        delayBeforeNext={400}
        loop={true}
      />
    </div>
  );
}
