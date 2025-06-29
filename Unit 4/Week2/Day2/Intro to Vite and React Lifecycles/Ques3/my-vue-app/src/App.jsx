import './App.css'
import ProfileCard from './Components/ProfileCard'

function App() {


  return (
    <>
      <div style={{ padding: '40px' }}>
        <ProfileCard
          name="Jane Doe"
          age={28}
          bio="Full-stack developer with a passion for creating user-friendly web apps. In love with React, Node.js, and clean UI."
        />
        <ProfileCard
          age={35}
        />
      </div>
    </>
  )
}

export default App
