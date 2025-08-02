import NotificationList from './components/NotificationList';
import ControlButtons from './components/ControlButtons';

export default function App() {
  return (
    <div className="app">
      <h1>🔔 Real-Time Notifications</h1>
      <ControlButtons />
      <NotificationList />
    </div>
  );
}
